# Builds a submission zip without node_modules, dist, .git, or .env
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$stamp = Get-Date -Format "yyyyMMdd-HHmm"
$staging = Join-Path $env:TEMP "InternAssign-submit-$stamp"
$zipName = "InternAssign-source-submission-$stamp.zip"
$outZip = Join-Path ([Environment]::GetFolderPath("Desktop")) $zipName

Write-Host "Project root: $root"
Write-Host "Staging:      $staging"

if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }
New-Item -ItemType Directory -Path $staging | Out-Null

$excludeDirs = @("node_modules", "dist", ".git", "dist-ssr")
$robocopyLog = Join-Path $env:TEMP "robocopy-internassign.log"
$null = robocopy $root $staging /E /XD $excludeDirs /XF ".env" ".env.local" /NFL /NDL /NJH /NJS /NC /NS /NP
# robocopy exit 0-7 = success for our purposes
if ($LASTEXITCODE -gt 7) {
  Write-Error "robocopy failed with code $LASTEXITCODE"
}

if (Test-Path $outZip) { Remove-Item $outZip -Force }
Compress-Archive -Path (Join-Path $staging "*") -DestinationPath $outZip -CompressionLevel Optimal

Remove-Item $staging -Recurse -Force

Write-Host ""
Write-Host "Done: $outZip" -ForegroundColor Green
Write-Host "Recipients run: npm install in frontend/ and backend/ after unzip."
