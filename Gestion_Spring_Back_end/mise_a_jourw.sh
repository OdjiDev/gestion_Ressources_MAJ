# Change directory to the directory of the script
Set-Location (Split-Path -Parent $MyInvocation.MyCommand.Definition)

# Move up one directory
Set-Location ..

# Change to the specific directory
Set-Location "Gestion_Angular_Front_end/src/app/modules/admin/interfaces/page-produit/list-produit/"

# Assign the current directory to the variable 'path'
$path = Get-Location

# Variables
Write-Host "Début du script mise_a_jour.ps1"
$LOCAL_DIR = $path
$REMOTE_DIR = "/home/versioning/depot_logiciel/gestion_suivie_p/Gestion_Angular_Front_end/src/app/modules/admin/interfaces/page-produit/list-produit"
$SERVER = "192.168.139.141"
$USERNAME = "serveurMaj"

# Print the variable 'path' to be captured by Java
Write-Host "le path est : ================================path="
Write-Host "path=$path"

# Fonction pour remplacer le fichier local par le fichier distant
function Replace-LocalFile {
    param (
        [string]$localFile,
        [string]$tempLocalCopy
    )
    Write-Host "Remplacement du fichier local $localFile par le fichier distant..."
    Move-Item -Path $tempLocalCopy -Destination $localFile -Force
}

# Fonction pour comparer et remplacer les fichiers
function Compare-AndReplace {
    param (
        [string]$localFile,
        [string]$remoteFile,
        [string]$tempLocalCopy
    )

    Write-Host "Tentative de téléchargement du fichier distant $remoteFile..."
    scp $USERNAME@$SERVER:$remoteFile $tempLocalCopy
    $scpExitCode = $LASTEXITCODE
    Write-Host "Code de sortie de SCP: $scpExitCode"

    # Vérification et comparaison des fichiers
    if (Test-Path $tempLocalCopy) {
        if (Compare-Object (Get-Content $localFile) (Get-Content $tempLocalCopy) | Measure-Object | Select-Object -ExpandProperty Count -eq 0) {
            Write-Host "Les fichiers sont identiques."
        } else {
            Write-Host "Les fichiers sont différents. Remplacement en cours..."
            Replace-LocalFile $localFile $tempLocalCopy
        }
        # Suppression de la copie temporaire
        Remove-Item $tempLocalCopy
    } else {
        Write-Host "Échec du téléchargement du fichier distant."
        exit 1
    }
}

# Fonction pour parcourir les répertoires et comparer les fichiers
function Process-Directory {
    param (
        [string]$localDir,
        [string]$remoteDir
    )

    Write-Host "Traitement du répertoire local: $localDir"
    Write-Host "Traitement du répertoire distant: $remoteDir"

    Get-ChildItem -Path $localDir -Recurse -File | ForEach-Object {
        $localFile = $_.FullName
        Write-Host "Traitement du fichier local: $localFile"
        $relativePath = $localFile.Substring($localDir.Length + 1)
        $remoteFile = "$remoteDir/$relativePath"
        $tempLocalCopy = [System.IO.Path]::Combine($env:TEMP, [System.IO.Path]::GetFileName($localFile))

        Write-Host "Comparaison avec le fichier distant: $remoteFile"
        Compare-AndReplace $localFile $remoteFile $tempLocalCopy
    }


# Exécution du traitement
Process-Directory $LOCAL_DIR $REMOTE_DIR

Write-Host "fin du script mise_a_jour.ps1"
