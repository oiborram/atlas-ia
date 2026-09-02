function Get-ProfessorTextHash([string]$Content) {
  $normalized = $Content -replace "`r`n?", "`n"
  [uint64]$hash = 5381
  foreach ($character in $normalized.ToCharArray()) {
    $hash = ((($hash * 33) -bxor [uint32][char]$character) -band 4294967295)
  }
  return ([uint32]$hash).ToString('x8')
}

function Convert-MarkdownForProfessor([string]$Markdown) {
  $text = $Markdown -replace "`r`n?", "`n"
  $text = [regex]::Replace($text, '(?s)```.*?```', "`nBloque de código omitido.`n")
  $text = [regex]::Replace($text, '!\[([^\]]*)\]\([^\)]*\)', '$1')
  $text = [regex]::Replace($text, '\[([^\]]+)\]\([^\)]*\)', '$1')
  $text = [regex]::Replace($text, '(?m)^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$', { param($match) "... $($match.Groups[2].Value.Trim()). ..." })
  $text = [regex]::Replace($text, '(?m)^\s*\|(.+)\|\s*$', {
    param($match)
    $cells = @($match.Groups[1].Value.Split('|') | ForEach-Object { $_.Trim() } | Where-Object { $_ -and $_ -notmatch '^:?-{3,}:?$' })
    if ($cells.Count -eq 0) { return '' }
    return ($cells -join '. ') + '.'
  })
  $text = [regex]::Replace($text, '(?m)^\s*[-*_]{3,}\s*$', '...')
  $text = [regex]::Replace($text, '(?m)^\s*(?:[-*+] |\d+[.)] )', '')
  $text = [regex]::Replace($text, '(?m)^\s*>\s?', '')
  $text = [regex]::Replace($text, '<[^>]+>', ' ')
  $text = [regex]::Replace($text, 'https?://\S+', ' enlace ')
  $text = $text -replace '[`*_~]', ''
  $text = [regex]::Replace($text, '[ \t]+', ' ')
  $text = [regex]::Replace($text, "`n{3,}", "`n`n")
  return $text.Trim()
}

function Get-ProfessorNarrationHash([string]$Markdown) {
  return Get-ProfessorTextHash (Convert-MarkdownForProfessor $Markdown)
}

function Get-ProfessorAudioSha256([string]$Path) {
  return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}
