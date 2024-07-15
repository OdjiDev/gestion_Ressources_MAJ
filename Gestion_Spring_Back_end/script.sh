#!/bin/bash

# Naviguer vers le répertoire du dépôt Git
# cd /chemin/vers/votre/repo
 
# Change the current working directory to the script's directory
cd "$(dirname "$0")"

# Exécuter la commande git status
git status

#List modified files:
 git status | grep 'modified:'

# Display the current working directory
#echo "Répertoire d'exécution actuel : $(pwd)"
git add *
  git commit -m "Sauvegarde de la version actuelle du local"
 git pull -a origin main

# Afficher un message en fonction du statut du dépôt
if [ $? -eq 0 ]; then
  echo "Votre dépôt Git est propre ."
else
  echo "Votre dépôt Git n'est pas propre. Veuillez exécuter git add et git commit pour enregistrer vos modifications."

  # Ajouter tous les fichiers modifiés à la zone d'indexation Git
  git add *

  # Exécuter la commande git commit avec le message spécifié
  git commit -m "Sauvegarde de la version actuelle"

#git pull origin main

#Display commit message:
  git log -1 --pretty=format:"%s"

#List modified files:
git status | grep 'modified:'


  # Afficher un message de confirmation
  echo "Modifications sauvegardées avec succès !"
fi




