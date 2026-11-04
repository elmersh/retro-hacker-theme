# PowerShell
param(
    [Parameter(Mandatory = $true)][string]$Path,
    [int]$Days = 7
)

function Get-OldFiles {
    [CmdletBinding()]
    param([string]$Dir)
    Get-ChildItem -Path $Dir -Recurse -File |
        Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$Days) } |
        Select-Object Name, Length
}

$files = Get-OldFiles -Dir $Path
Write-Host "Encontrados: $($files.Count)" -ForegroundColor Green
