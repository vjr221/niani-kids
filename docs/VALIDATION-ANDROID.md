# Validation avant APK — Niani Kids

## Contrôles automatiques
1. `npm install` installe les dépendances, dont Sharp pour l’export PNG.
2. `npm run assets` génère l’icône, le splash et les illustrations personnages avant TypeScript et EAS.
3. `npx tsc --noEmit` doit passer sans erreur.
4. EAS construit le profil `preview` en APK pour les tests Android.

## Tests sur téléphone requis
- Menu inférieur visible et entièrement cliquable avec navigation Android par gestes et par boutons.
- Accueil, Bibliothèque, Jouer, Atelier, Parents et retour Android.
- Favoris et langue conservés après fermeture/réouverture.
- Jeux : réponse correcte, réponse incorrecte, bouton continuer et compteur d’étoiles.
- Audio : la voix de synthèse est annoncée comme telle. Ne pas présenter les paroles lues comme une chanson enregistrée.
- Les liens externes doivent demander confirmation dans l’espace Parents.

## Limites connues avant publication
- Les illustrations SVG générées sont provisoires ; remplacer par les rendus 3D officiels validés.
- Les véritables masters audio des comptines et berceuses restent à produire et intégrer.
- Les traductions wolof de travail doivent être relues par un locuteur natif.
- Ajouter politique de confidentialité, contact et vérifications Google Play Families.
