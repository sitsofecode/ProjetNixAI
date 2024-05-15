NixApp
Description
NixApp est une application mobile basée sur l'intelligence artificielle visant à réduire les barrières linguistiques. Elle offre plusieurs fonctionnalités, notamment la sous-titrage de vidéos, la traduction de texte dans les images et la traduction d'enregistrements vocaux.

Prérequis
Node.js (version 14 ou supérieure)
Expo CLI
Un émulateur Android/iOS ou un appareil physique pour le test


Installation

Cloner le dépôt :
git clone  https://github.com/sitsofecode/ProjetNixAI.git
cd nixapp
Installer les dépendances :



npm install
Installer Expo CLI (si ce n'est pas déjà fait) :



npm install -g expo-cli
Utilisation
Démarrer le projet :



npm start
ou



 npx expo start
Lancer sur un émulateur ou un appareil physique :

Pour Android :


npm run android
Pour iOS :


npm run ios
Pour le web :


npm run web


Dépendances
Voici la liste des principales dépendances utilisées dans ce projet :

@react-navigation : Pour la navigation dans l'application.
expo-av : Pour la gestion de l'audio et de la vidéo.
expo-camera : Pour l'utilisation de la caméra.
axios : Pour les requêtes HTTP.
recyclerlistview : Pour des listes performantes et recyclables.
Pour plus de détails, veuillez consulter le fichier package.json.
