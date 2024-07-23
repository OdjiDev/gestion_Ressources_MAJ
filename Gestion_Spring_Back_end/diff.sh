#!/bin/bash

# Variables
LOCAL_DIR="/z/logiciel_MAJ/user3/Gestion_Angular_Front_end/src/app/modules/admin/interfaces/page-produit/list-produit"

REMOTE_DIR="/home/developpeur/gestion_Ressources_MAJ/Gestion_Angular_Front_end/src/app/modules/admin/interfaces/page-produit/list-produit"
SERVER="192.168.80.128"
USERNAME="serveurMaj"

# Fonction pour remplacer le fichier local par le fichier distant
replace_local_file() {
    local local_file=$1
    local temp_local_copy=$2
    echo "Remplacement du fichier local $local_file par le fichier distant..."
    mv $temp_local_copy $local_file
}
# $compteur=0
# Fonction pour comparer et remplacer les fichiers
compare_and_replace() {
    local local_file=$1
    local remote_file=$2
    local temp_local_copy=$3


    echo "Tentative de téléchargement du fichier distant $remote_file..."
    scp $USERNAME@$SERVER:$remote_file $temp_local_copy
    #  compteur=compteur+$1
    #  echo"$compteur"
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

    for local_file in $(find $local_dir -type f); do
        relative_path=${local_file#$local_dir/}
        remote_file="$remote_dir/$relative_path"
        temp_local_copy="/tmp/$(basename $local_file)"

        compare_and_replace $local_file $remote_file $temp_local_copy
    done
}

# Exécution du traitement
process_directory $LOCAL_DIR $REMOTE_DIR
