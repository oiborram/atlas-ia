param(
  [string]$IrisProject = 'F:\dev\Iris',
  [string]$Voice = 'joven_canaria_01',
  [string[]]$Only = @()
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$manifestPath = Join-Path $PSScriptRoot 'audio-summaries.json'
$audioDirectory = Join-Path $projectRoot 'public\audio'
$irisExecutable = Join-Path $IrisProject '.venv\Scripts\iris.exe'
$irisOutputDirectory = Join-Path $IrisProject 'outputs'

function Get-WavDurationSeconds([string]$Path) {
  $stream = [System.IO.File]::OpenRead($Path)
  $reader = [System.IO.BinaryReader]::new($stream)
  try {
    $stream.Position = 28
    $byteRate = $reader.ReadUInt32()
    $stream.Position = 40
    $dataSize = $reader.ReadUInt32()
    return $dataSize / $byteRate
  }
  finally {
    $reader.Dispose()
    $stream.Dispose()
  }
}

if (-not (Test-Path -LiteralPath $irisExecutable -PathType Leaf)) {
  throw "No se encontró Iris en $irisExecutable"
}

New-Item -ItemType Directory -Force -Path $audioDirectory | Out-Null
$summaries = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
if ($Only.Count -gt 0) {
  $summaries = @($summaries | Where-Object { $_.categoryId -in $Only })
}
$index = 0

foreach ($summary in $summaries) {
  $filename = "atlas-$($summary.categoryId)"
  $seed = 4242 + $index
  $source = Join-Path $irisOutputDirectory "$filename.wav"
  $destination = Join-Path $audioDirectory "$filename.wav"
  $minimumDuration = [math]::Max(8, $summary.script.Length / 34)
  $duration = 0

  for ($attempt = 0; $attempt -lt 3; $attempt += 1) {
    $attemptSeed = $seed + ($attempt * 1000)
    Write-Host "Sintetizando $($summary.categoryId), intento $($attempt + 1)..."
    & $irisExecutable speak $summary.script --no-play --voice $Voice --filename $filename --seed $attemptSeed
    if ($LASTEXITCODE -ne 0) {
      if ($attempt -lt 2) {
        Write-Warning "Iris interrumpió la síntesis de $($summary.categoryId). Se reintentará."
        Start-Sleep -Seconds 1
        continue
      }
      throw "Iris no pudo sintetizar $($summary.categoryId) tras tres intentos"
    }

    Copy-Item -LiteralPath $source -Destination $destination -Force
    $duration = Get-WavDurationSeconds -Path $destination
    if ($duration -ge $minimumDuration) {
      break
    }
    Write-Warning "$($summary.categoryId) quedó anormalmente corto ($([math]::Round($duration, 1)) s). Se repetirá con otra semilla."
  }

  if ($duration -lt $minimumDuration) {
    throw "El audio de $($summary.categoryId) sigue incompleto tras tres intentos"
  }
  $index += 1
}

Write-Host "Audios generados en $audioDirectory"
