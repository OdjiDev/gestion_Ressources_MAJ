#!/bin/bash

# Définir les variables
SERVER_USER="serveurMaj"  # Remplacez par votre nom d'utilisateur sur le serveur
SERVER_HOST="192.168.139.141" # Remplacez par l'adresse IP ou le nom d'hôte du serveur
KEY_PATH="$HOME/.ssh/id_rsa"  # Chemin vers la clé privée SSH
PUBLIC_KEY_PATH="$KEY_PATH.pub"
echo"$HOME"
# Étape 1: Générer une paire de clés SSH
if [ ! -f "$KEY_PATH" ]; then
    echo "Aucune clé SSH trouvée. Génération d'une nouvelle paire de clés..."
    ssh-keygen -t rsa -b 4096 -C "votre-email@example.com" -f "$KEY_PATH" -N ""
else
    echo "Une clé SSH existe déjà à l'emplacement $KEY_PATH."
fi

# Étape 2: Copier la clé publique sur le serveur
echo "Copie de la clé publique sur le serveur..."
ssh-copy-id -i "$PUBLIC_KEY_PATH" "$SERVER_USER@$SERVER_HOST"

# Vérifier si la clé publique a été copiée avec succès
if [ $? -eq 0 ]; then
    echo "Clé publique copiée avec succès sur le serveur."
else
    echo "Échec de la copie de la clé publique. Veuillez vérifier les erreurs."
    exit 1
fi

# Étape 3: Tester la connexion SSH
echo "Test de la connexion SSH au serveur..."
ssh -i "$KEY_PATH" "$SERVER_USER@$SERVER_HOST" "echo 'Connexion réussie !'"

# Vérifier si la connexion SSH a réussi
if [ $? -eq 0 ]; then
    echo "Connexion SSH réussie."
else
    echo "Échec de la connexion SSH. Veuillez vérifier les erreurs."
    exit 1
fi
