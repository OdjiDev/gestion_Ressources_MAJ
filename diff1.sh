#!/bin/bash

# Chemins des dossiers
SERVER_DIR="/Z:/logiciel_Maj/local"
LOCAL_DIR="/home/versioning/gestion_suivie_p"
#une inversion de non a ete fais pour ne pas tout changer<<<local=serveur et inverse>>><
# Vérifier si les dossiers existent
if [ ! -d "$LOCAL_DIR" ]; then
    echo "Erreur : Le dossier local $LOCAL_DIR n'existe pas."
    exit 1
fi

if [ ! -d "$SERVER_DIR" ]; then
    echo "Erreur : Le dossier serveur $SERVER_DIR n'existe pas."
    exit 1
fi

# Parcourir tous les fichiers du dossier local
for LOCAL_FILE in "$LOCAL_DIR"/*; do
    FILE_NAME=$(basename "$LOCAL_FILE")
    SERVER_FILE="$SERVER_DIR/$FILE_NAME"

    # Vérifier si le fichier serveur correspondant existe
    if [ ! -f "$SERVER_FILE" ]; then
        echo "Le fichier serveur $SERVER_FILE n'existe pas. Copie du fichier local $LOCAL_FILE vers le dossier serveur."
        cp "$LOCAL_FILE" "$SERVER_FILE"
        cp_exit_code=$?

        if [ $cp_exit_code -eq 0 ]; then
            echo "Le fichier $SERVER_FILE a été copié avec le contenu de $LOCAL_FILE."
        else
            echo "Erreur : Impossible de copier le fichier $LOCAL_FILE vers $SERVER_FILE."
        fi
        continue
    fi

    # Comparer les fichiers
    diff_output=$(diff "$LOCAL_FILE" "$SERVER_FILE")
    diff_exit_code=$?

    # Vérifier s'il y a des différences
    if [ $diff_exit_code -eq 0 ]; then
        echo "Les fichiers $LOCAL_FILE et $SERVER_FILE sont identiques. Aucune action nécessaire."
    elif [ $diff_exit_code -eq 1 ]; then
        echo "Des différences ont été détectées entre $LOCAL_FILE et $SERVER_FILE. Remplacement du fichier serveur."

        # Copier le fichier local vers le serveur en remplaçant l'ancien fichier
        cp "$LOCAL_FILE" "$SERVER_FILE"
        cp_exit_code=$?

        if [ $cp_exit_code -eq 0 ]; then
            echo "Le fichier $SERVER_FILE a été remplacé avec le contenu de $LOCAL_FILE."
        else
            echo "Erreur : Impossible de remplacer le fichier $SERVER_FILE."
        fi
    else
        echo "Erreur : La commande diff a échoué pour les fichiers $LOCAL_FILE et $SERVER_FILE."
    fi
done

