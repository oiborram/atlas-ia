param(
  [string]$IrisProject = 'F:\dev\Iris',
  [string]$Voice = 'joven_canaria_01',
  [string[]]$Only = @(),
  [string]$ResumeCategory = '',
  [string]$ResumeStem = '',
  [switch]$PruneOnly,
  [int]$RequestTimeoutSeconds = 1800
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot 'professor-audio-lib.ps1')
$audioDirectory = Join-Path $projectRoot 'public\audio'
$manifestPath = Join-Path $projectRoot 'src\professorAudioManifest.json'
$irisExecutable = Join-Path $IrisProject '.venv\Scripts\iris.exe'
$irisOutputDirectory = Join-Path $IrisProject 'outputs'
$ffmpeg = (Get-Command ffmpeg -ErrorAction Stop).Source
$ffprobe = (Get-Command ffprobe -ErrorAction Stop).Source
$previousRequestTimeout = $env:IRIS_DAEMON_REQUEST_TIMEOUT_SECONDS
$env:IRIS_DAEMON_REQUEST_TIMEOUT_SECONDS = $RequestTimeoutSeconds.ToString()
$sectionNames = [ordered]@{
  '00-guia' = 'Guía del Atlas de IA'
  '01-era-alphago' = 'La era AlphaGo'
  '02-era-transformer' = 'La era Transformer'
  '03-era-chatgpt' = 'La era ChatGPT'
  '04-era-ia-local' = 'La era de la IA local'
  '05-era-thinking' = 'La era Thinking'
  '06-era-agent-tools' = 'Era Agent Tools'
  '07-era-mcp' = 'Era MCP'
  '08-era-agentes-autonomos' = 'Era de los agentes autónomos'
  '09-impacto-y-productos' = 'Impacto y productos'
  '11-casos-y-experimentos' = 'Casos y experimentos'
  '12-codex' = 'Codex a fondo'
  '13-prompting-loop-graph-engineering' = 'Prompting, loops y grafos'
  '16-panorama-actual' = 'Panorama actual'
}

function Split-SpeechText([string]$Text, [int]$Limit = 3500) {
  $blocks = @($Text -split "`n`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ })
  $chunks = [System.Collections.Generic.List[string]]::new()
  $current = ''
  foreach ($block in $blocks) {
    if ($block.Length -gt $Limit) {
      $sentences = @([regex]::Split($block, '(?<=[.!?])\s+') | Where-Object { $_ })
    } else {
      $sentences = @($block)
    }
    foreach ($sentence in $sentences) {
      $candidate = if ($current) { "$current`n`n$sentence" } else { $sentence }
      if ($current -and $candidate.Length -gt $Limit) {
        $chunks.Add($current)
        $current = $sentence
      } else {
        $current = $candidate
      }
    }
  }
  if ($current) { $chunks.Add($current) }
  return $chunks.ToArray()
}

function Convert-EntryToSchema2($Entry) {
  $audioPath = Join-Path $projectRoot ('public\' + $Entry.src.Replace('/', '\'))
  $sources = foreach ($source in $Entry.sources) {
    $sourcePath = Join-Path $projectRoot $source.path.Replace('/', '\')
    $sourceHash = if ($source.sourceHash) { $source.sourceHash } else { $source.hash }
    $narrationHash = $source.narrationHash
    if (-not $narrationHash -and (Test-Path -LiteralPath $sourcePath -PathType Leaf)) {
      $markdown = Get-Content -Raw -LiteralPath $sourcePath
      if ((Get-ProfessorTextHash $markdown) -eq $sourceHash) {
        $narrationHash = Get-ProfessorNarrationHash $markdown
      }
    }
    [ordered]@{
      path = $source.path
      sourceHash = $sourceHash
      narrationHash = $narrationHash
      lastModifiedAt = $source.lastModifiedAt
    }
  }
  [ordered]@{
    categoryId = $Entry.categoryId
    title = $Entry.title
    src = $Entry.src
    generatedAt = $Entry.generatedAt
    sourceLastModifiedAt = $Entry.sourceLastModifiedAt
    durationSeconds = $Entry.durationSeconds
    audioSha256 = if (Test-Path -LiteralPath $audioPath -PathType Leaf) { Get-ProfessorAudioSha256 $audioPath } else { $Entry.audioSha256 }
    sources = @($sources)
  }
}

function Write-ProfessorManifest([object[]]$Entries, [string]$VoiceName, [string]$TtsName) {
  $orderedEntries = @($Entries | Sort-Object { [array]::IndexOf(@($sectionNames.Keys), $_.categoryId) } | ForEach-Object { Convert-EntryToSchema2 $_ })
  $payload = [ordered]@{
    schemaVersion = 2
    updatedAt = (Get-Date).ToUniversalTime().ToString('o')
    voice = $VoiceName
    tts = $TtsName
    sections = $orderedEntries
  } | ConvertTo-Json -Depth 8
  $temporaryManifest = "$manifestPath.tmp"
  $payload | Set-Content -LiteralPath $temporaryManifest -Encoding utf8
  Move-Item -LiteralPath $temporaryManifest -Destination $manifestPath -Force
}

New-Item -ItemType Directory -Force -Path $audioDirectory | Out-Null

if ($PruneOnly) {
  if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) { throw "No se encontró $manifestPath" }
  $existing = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
  $validCategoryIds = @($sectionNames.Keys)
  $removed = @($existing.sections | Where-Object { $_.categoryId -notin $validCategoryIds })
  foreach ($entry in $removed) {
    $obsoleteAudio = Join-Path $projectRoot ('public\' + $entry.src.Replace('/', '\'))
    if (Test-Path -LiteralPath $obsoleteAudio -PathType Leaf) { Remove-Item -LiteralPath $obsoleteAudio -Force }
  }
  $kept = @($existing.sections | Where-Object { $_.categoryId -in $validCategoryIds } | Sort-Object { [array]::IndexOf($validCategoryIds, $_.categoryId) })
  Write-ProfessorManifest $kept $existing.voice $existing.tts
  Write-Host "Manifiesto depurado: $($kept.Count) secciones; $($removed.Count) retiradas."
  return
}

if (-not (Test-Path -LiteralPath $irisExecutable -PathType Leaf)) { throw "No se encontró Iris en $irisExecutable" }
$workDirectory = Join-Path ([System.IO.Path]::GetTempPath()) "atlas-professor-$([guid]::NewGuid().ToString('N'))"
New-Item -ItemType Directory -Path $workDirectory | Out-Null

try {
  $existing = if (Test-Path $manifestPath) { Get-Content -Raw $manifestPath | ConvertFrom-Json } else { $null }
  $entries = [System.Collections.Generic.List[object]]::new()
  if ($existing) { foreach ($entry in $existing.sections) { $entries.Add($entry) } }

  foreach ($categoryId in $sectionNames.Keys) {
    if ($Only.Count -gt 0 -and $categoryId -notin $Only) { continue }
    $sourceDirectory = Join-Path $projectRoot $categoryId
    $files = @(Get-ChildItem -LiteralPath $sourceDirectory -File -Filter '*.md' | Sort-Object @{ Expression = {
      if ($_.BaseName -eq '00-resumen') { 0 } elseif ($_.BaseName -eq 'README') { 1 } else { 2 }
    } }, Name)
    if ($files.Count -eq 0) { throw "La sección $categoryId no contiene Markdown" }

    $sourceRecords = @()
    $speechDocuments = @()
    foreach ($file in $files) {
      $markdown = Get-Content -Raw -LiteralPath $file.FullName
      $relativePath = [System.IO.Path]::GetRelativePath($projectRoot, $file.FullName).Replace('\', '/')
      $sourceRecords += [ordered]@{
        path = $relativePath
        sourceHash = Get-ProfessorTextHash $markdown
        narrationHash = Get-ProfessorNarrationHash $markdown
        lastModifiedAt = $file.LastWriteTimeUtc.ToString('o')
      }
      $speechDocuments += Convert-MarkdownForProfessor $markdown
    }
    $speech = $speechDocuments -join "`n`n...`n`n"
    $chunks = @(Split-SpeechText $speech)
    $timestamp = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
    $stem = if ($categoryId -eq $ResumeCategory -and $ResumeStem) { $ResumeStem } else { "profesor-$categoryId-$timestamp" }
    $concatLines = [System.Collections.Generic.List[string]]::new()

    for ($index = 0; $index -lt $chunks.Count; $index += 1) {
      $chunkStem = "$stem-parte-$($index + 1)"
      $seed = 8421 + ([array]::IndexOf(@($sectionNames.Keys), $categoryId) * 100) + $index
      $chunkPath = Join-Path $irisOutputDirectory "$chunkStem.wav"
      if (Test-Path -LiteralPath $chunkPath -PathType Leaf) {
        Write-Host "[$categoryId] Reutilizando fragmento $($index + 1) de $($chunks.Count)..."
        $escaped = $chunkPath.Replace("'", "'\''")
        $concatLines.Add("file '$escaped'")
        continue
      }
      Write-Host "[$categoryId] Sintetizando fragmento $($index + 1) de $($chunks.Count)..."
      & $irisExecutable speak $chunks[$index] --no-play --voice $Voice --filename $chunkStem --seed $seed
      if ($LASTEXITCODE -ne 0) { throw "Iris no pudo sintetizar $categoryId, fragmento $($index + 1)" }
      if (-not (Test-Path $chunkPath)) { throw "Iris no creó $chunkPath" }
      $escaped = $chunkPath.Replace("'", "'\''")
      $concatLines.Add("file '$escaped'")
    }

    $concatPath = Join-Path $workDirectory "$stem.txt"
    $combinedWav = Join-Path $workDirectory "$stem.wav"
    $destination = Join-Path $audioDirectory "$stem.ogg"
    $concatLines | Set-Content -LiteralPath $concatPath -Encoding utf8
    & $ffmpeg -hide_banner -loglevel error -f concat -safe 0 -i $concatPath -c copy $combinedWav
    if ($LASTEXITCODE -ne 0) { throw "FFmpeg no pudo unir los fragmentos de $categoryId" }
    & $ffmpeg -hide_banner -loglevel error -i $combinedWav -c:a libopus -b:a 48k -vbr on -compression_level 10 $destination
    if ($LASTEXITCODE -ne 0) { throw "FFmpeg no pudo comprimir el audio de $categoryId" }
    $duration = [double](& $ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $destination)
    $generatedAt = (Get-Date).ToUniversalTime().ToString('o')
    $sourceLastModifiedAt = ($files | Sort-Object LastWriteTimeUtc -Descending | Select-Object -First 1).LastWriteTimeUtc.ToString('o')

    for ($entryIndex = $entries.Count - 1; $entryIndex -ge 0; $entryIndex -= 1) {
      if ($entries[$entryIndex].categoryId -eq $categoryId) { $entries.RemoveAt($entryIndex) }
    }
    $entries.Add([ordered]@{
      categoryId = $categoryId
      title = $sectionNames[$categoryId]
      src = "audio/$stem.ogg"
      generatedAt = $generatedAt
      sourceLastModifiedAt = $sourceLastModifiedAt
      durationSeconds = [math]::Round($duration, 3)
      audioSha256 = Get-ProfessorAudioSha256 $destination
      sources = $sourceRecords
    })

    Get-ChildItem -LiteralPath $audioDirectory -File -Filter "profesor-$categoryId-*.ogg" |
      Where-Object { $_.FullName -ne $destination } | Remove-Item -Force
    Get-ChildItem -LiteralPath $irisOutputDirectory -File -Filter "$stem-parte-*.wav" | Remove-Item -Force
    Write-Host "[$categoryId] Audio listo: $([math]::Round($duration / 60, 1)) min"

    Write-ProfessorManifest $entries $Voice 'Iris / Chatterbox-Multilingual-es-es'
  }
}
finally {
  if ($null -eq $previousRequestTimeout) {
    Remove-Item Env:IRIS_DAEMON_REQUEST_TIMEOUT_SECONDS -ErrorAction SilentlyContinue
  } else {
    $env:IRIS_DAEMON_REQUEST_TIMEOUT_SECONDS = $previousRequestTimeout
  }
  if (Test-Path -LiteralPath $workDirectory) { Remove-Item -LiteralPath $workDirectory -Recurse -Force }
}

Write-Host "Audios de profesor generados en $audioDirectory"
