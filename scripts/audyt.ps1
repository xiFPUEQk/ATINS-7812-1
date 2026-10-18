# Bezpieczny audyt odczytowy. Uruchom w katalogu rzeczywistego projektu.
Write-Output "=== KATALOG ==="
Get-Location
Get-ChildItem -Force | Select-Object Mode, Name
Write-Output "=== NARZEDZIA ==="
foreach ($cmd in @('node','npm','git','gh')) {
  $item=Get-Command $cmd -ErrorAction SilentlyContinue
  if ($null -eq $item) { Write-Output "$cmd : BRAK" }
  else {
    if ($cmd -eq 'npm') { & $cmd --version }
    else { & $cmd --version }
  }
}
Write-Output "=== GIT (bez sekretow) ==="
git status --short 2>&1
git branch -a 2>&1
# Pomijamy `git remote -v`: adresy moga zawierac prywatne dane.
Write-Output "=== KONFIGURACJA PLIKI (bez node_modules) ==="
Get-ChildItem -Recurse -File -Include package.json,tsconfig.json,jsconfig.json,vite.config.*,vercel.json,selenium*.js,wrangler.jsonc -ErrorAction SilentlyContinue |
 Where-Object { $_.FullName -notmatch 'node_modules|[\\/]\.git[\\/]' } |
 Select-Object -ExpandProperty FullName
