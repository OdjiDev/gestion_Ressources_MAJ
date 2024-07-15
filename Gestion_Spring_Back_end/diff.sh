#!/bin/bash

# Chemins absolus des fichiers
LOCAL_FILE="/home/versioning/developpeur/diff1.txt"
SERVER_FILE="/home/versioning/gestion_suivie_p/diff.txt"

# Comparer les fichiers
diff_output=$(diff $LOCAL_FILE $SERVER_FILE)

# Vérifier s'il y a des différences
if [ $? -eq 0 ]; then
    echo "Les fichiers sont identiques. Aucune action nécessaire."
else
    echo "Des différences ont été détectées. Mise à jour du fichier sur le serveur."

    # Ajouter les lignes de différence au fichier sur le serveur
    diff_lines=$(echo "$diff_output" | grep '^<' | sed 's/^< //' | sed '/^\s*$/d')

    if [ -n "$diff_lines" ]; then
        # Ajouter les lignes de différence à la fin du fichier sur le serveur
        echo "$diff_lines" | ssh user@server "cat >> $SERVER_FILE"
        echo "Les lignes de différence ont été ajoutées au fichier sur le serveur."
    else
        echo "Aucune ligne de différence à ajouter."
    fi
fi
