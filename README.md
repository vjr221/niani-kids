# Niani Kids — application mobile

Application Expo / React Native / TypeScript pour la chaîne **Niani Kids — Les petites mélodies d’Afrique**.

## Fonctionnalités du starter
- Accueil éditorial avec les catégories Comptines, Berceuses, J'apprends et Histoires.
- Navigation Accueil / Explorer / Favoris / Parents.
- Recherche locale de contenus de démonstration.
- Favoris locaux avec AsyncStorage.
- Sélecteur Français / Wolof (les textes wolof sont des exemples à valider linguistiquement).
- Accès aux chaînes YouTube et TikTok.
- Écran Parents avec avertissement et liens externes.
- Thème enfantin inspiré des couleurs du logo.

## Prérequis
- Node.js LTS
- Expo Go sur téléphone pour le premier test

## Démarrer
```bash
npm install
npx expo start
```

Scannez le QR code avec Expo Go.

## Préparer le logo
Placez les fichiers de marque dans `assets/` :
- `logo.png` : logo Niani Kids carré ou circulaire
- `samba.png`, `awa.png`, `bobo.png`, `baobab.png` : personnages détourés, si disponibles

Le starter utilise des aplats et des emoji en remplacement pour rester exécutable sans ces fichiers.

## Avant une publication
1. Remplacer les contenus de démonstration par les vidéos réelles de la chaîne.
2. Vérifier les traductions wolof avec un locuteur natif.
3. Ajouter une politique de confidentialité et une adresse de contact.
4. Tester les contrôles parentaux, les liens externes et l'expérience sur petits écrans.
5. Créer les identifiants de publication Expo/EAS et signer l'application Android.
6. Vérifier les règles Google Play concernant les applications destinées aux enfants.

## Liens officiels
- YouTube : https://www.youtube.com/@NianiKids
- TikTok : https://www.tiktok.com/@niani.kids

## Note
Ce dépôt constitue un **starter fonctionnel**, pas une application déjà publiée. Il n'inclut pas de vidéos téléchargées ni de clés de signature.
