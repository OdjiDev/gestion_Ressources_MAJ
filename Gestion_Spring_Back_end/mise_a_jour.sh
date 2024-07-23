#!/bin/bash
# les path
cd "$(dirname "$0")"
# Print the current directory to be captured by Java 
 cd ..
# Change to the specific directory
cd Gestion_Angular_Front_end/src/app/modules/admin/interfaces/page-produit/list-produit/
#  cd Gestion_Angular_Front_end/src/app/modules/admin/components/side-bar
# cd Gestion_Angular_Front_end/src/app/modules/admin
# cd Gestion_Angular_Front_end/src/app/modules/comptable
# cd Gestion_Angular_Front_end/src/app/modules/personnel

# Assign the current directory to the variable 'path'
path=$(pwd)

# Variables
echo "Début du script mise_a_jour.sh\n"
 LOCAL_DIR=$path
# REMOTE_DIR="/z/logiciel_MAJ/"
REMOTE_DIR="/home/versioning/depot_logiciel/gestion_suivie_p/Gestion_Angular_Front_end/src/app/modules/admin/interfaces/page-produit/list-produit"
#  REMOTE_DIR="/home/serveurMaj/versioning/gestion_Ressources_MAJ/Gestion_Angular_Front_end/src/app/modules/admin/interfaces/page-produit/list-produit"
SERVER="192.168.139.141"
USERNAME="serveurMaj"


# Print the variable 'path' to be captured by Java
echo "le path est : ================================path="
echo "path=$path"
# Fonction pour remplacer le fichier local par le fichier distant
replace_local_file() {
    local local_file=$1
    local temp_local_copy=$2
    echo "Remplacement du fichier local $local_file par le fichier distant..."
    mv $temp_local_copy $local_file
}

# Fonction pour comparer et remplacer les fichiers
compare_and_replace() {
    local local_file=$1
    local remote_file=$2
    local temp_local_copy=$3

    echo "Tentative de téléchargement du fichier distant $remote_file..."
    scp $USERNAME@$SERVER:$remote_file $temp_local_copy
    local scp_exit_code=$?
    echo "Code de sortie de SCP: $scp_exit_code"

    # Vérification et comparaison des fichiers
    if [ -f $temp_local_copy ]; then
        if diff $local_file $temp_local_copy > /dev/null; then
            echo "Les fichiers sont identiques."
        else
            echo "Les fichiers sont différents. Remplacement en cours..."
            replace_local_file $local_file $temp_local_copy
        fi
        # Suppression de la copie temporaire
        rm $temp_local_copy
    else
        echo "Échec du téléchargement du fichier distant."
        exit 1
    fi
}

# Fonction pour parcourir les répertoires et comparer les fichiers
process_directory() {
    local local_dir=$1
    local remote_dir=$2

    echo "Traitement du répertoire local: $local_dir"
    echo "Traitement du répertoire distant: $remote_dir"

    for local_file in $(find $local_dir -type f); do
        echo "Traitement du fichier local: $local_file"
        relative_path=${local_file#$local_dir/}
        remote_file="$remote_dir/$relative_path"
        temp_local_copy="/tmp/$(basename $local_file)"

        echo "Comparaison avec le fichier distant: $remote_file"
        compare_and_replace $local_file $remote_file $temp_local_copy
    done
}

# Exécution du traitement
 process_directory $LOCAL_DIR $REMOTE_DIR

echo "fin du script mise_a_jour.sh "
