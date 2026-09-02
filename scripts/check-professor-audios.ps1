param([switch]$Quiet)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot 'professor-audio-lib.ps1')
$manifestPath = Join-Path $projectRoot 'src\professorAudioManifest.json'
if (-not (Test-Path -LiteralPath $manifestPath)) { throw 'Falta src/professorAudioManifest.json. Ejecuta generate-professor-audios.ps1.' }
$manifest = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
$stale = [System.Collections.Generic.List[string]]::new()
$excludedSections = @('14-ampliacion-avanzada', '15-legal')
$expectedSections = @(Get-ChildItem -LiteralPath $projectRoot -Directory | Where-Object { $_.Name -match '^\d\d-' -and $_.Name -notin $excludedSections } | Where-Object { Get-ChildItem -LiteralPath $_.FullName -File -Filter '*.md' } | Select-Object -ExpandProperty Name)

foreach ($categoryId in @('referencias') + $excludedSections) {
  if ($categoryId -in @($manifest.sections.categoryId)) {
    $stale.Add("$categoryId`: es una sección sin TTS, pero aún figura en el manifiesto")
  }
  $forbiddenAudio = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'public\audio') -File | Where-Object {
    $_.Name -eq "atlas-$categoryId.wav" -or $_.Name -like "profesor-$categoryId-*.ogg"
  })
  foreach ($audio in $forbiddenAudio) {
    $stale.Add("$categoryId`: es una sección sin TTS, pero existe public/audio/$($audio.Name)")
  }
}

foreach ($categoryId in $expectedSections) {
  if ($categoryId -notin @($manifest.sections.categoryId)) { $stale.Add("$categoryId`: falta su audio completo en el manifiesto") }
}

foreach ($section in $manifest.sections) {
  $audioPath = Join-Path $projectRoot ('public\' + $section.src.Replace('/', '\'))
  if (-not (Test-Path -LiteralPath $audioPath -PathType Leaf)) {
    $stale.Add("$($section.categoryId): falta $($section.src)")
  } elseif ($section.audioSha256 -and (Get-ProfessorAudioSha256 $audioPath) -ne $section.audioSha256) {
    $stale.Add("$($section.categoryId): el archivo de audio no coincide con su huella registrada")
  }
  foreach ($source in $section.sources) {
    $sourcePath = Join-Path $projectRoot $source.path.Replace('/', '\')
    if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) {
      $stale.Add("$($section.categoryId): falta $($source.path)")
      continue
    }
    $markdown = Get-Content -Raw -LiteralPath $sourcePath
    $currentHash = if ($source.narrationHash) { Get-ProfessorNarrationHash $markdown } else { Get-ProfessorTextHash $markdown }
    $expectedHash = if ($source.narrationHash) { $source.narrationHash } elseif ($source.sourceHash) { $source.sourceHash } else { $source.hash }
    if ($currentHash -ne $expectedHash) { $stale.Add("$($section.categoryId): $($source.path) no coincide con el contenido narrado") }
  }
  $currentSources = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot $section.categoryId) -File -Filter '*.md')
  foreach ($current in $currentSources) {
    $relative = [System.IO.Path]::GetRelativePath($projectRoot, $current.FullName).Replace('\', '/')
    if ($relative -notin @($section.sources.path)) { $stale.Add("$($section.categoryId): el Markdown nuevo $relative no está narrado") }
  }
}

if ($stale.Count -gt 0) {
  Write-Error ("Audios de profesor desactualizados:`n- " + ($stale -join "`n- "))
}
if (-not $Quiet) { Write-Host "Audios de profesor al día: $($manifest.sections.Count) secciones verificadas por contenido y archivo." }
