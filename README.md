# Niani Kids — application mobile
**Niani Kids — Les petites mélodies d’Afrique** est une application Expo / React Native / TypeScript pour les enfants de 0 à 6 ans, à utiliser avec un adulte.

## Modules
- Accueil ludique : Samba, Awa et Bobo forment le trio principal; le Baobab est une mascotte-guide distincte qui ouvre les contes et les découvertes culturelles. Sa carte mène à l’histoire « Le secret du Baobab ».
- Bibliothèque : comptines, berceuses, apprentissages et histoires.
- Jeux interactifs : couleurs, dénombrement, gestes pour la nature, étoiles de récompense enregistrées localement.
- Ateliers parent-enfant : arts, rythme, baobab des gentillesses, conte en images, danse.
- Favoris enregistrés sur l'appareil.
- Espace Parents avec accès aux chaînes officielles.
- Interface français/wolof en cours de validation; faire relire les textes wolof par un locuteur natif avant diffusion publique.
- GitHub Actions pour contrôle TypeScript et export Android.

## Démarrer
```bash
npm install
npx expo start
```
Installe Expo Go sur le téléphone puis scanne le QR code.

## Identité graphique
- Le logo officiel transparent `assets/a_clean_graphic_png_logo_on_a_transparent_backgrou.png` est utilisé dans l'en-tête et configuré comme icône de l'application, icône adaptative Android et image du splash screen.
- Le splash screen utilise le fond crème `#FFF7D6` et le logo en mode `contain` pour éviter de le recadrer.
- Vérifier le rendu final de l'icône sur un appareil Android réel et les masques adaptatifs avant publication.
- Les références de marque officielles sont dans la médiathèque Niani Kids : logo circulaire avec bordure jaune, logo 3D typographique, planches de personnages et storyboard du village. Les quatre personnages sont définis ainsi : Samba (sweat bleu et cheveux courts bouclés), Awa (longues tresses avec perles colorées et tenue d'inspiration sénégalaise), Bobo (casquette rouge à l'envers, tee-shirt jaune), Baobab (arbre vivant sage). Ajouter les fichiers individuels optimisés dans `assets/characters/` quand les PNG séparés sont disponibles; ne pas découper automatiquement une planche d'illustrations pour en faire des personnages sans vérification.

## Contenus
- `src/officialSongCatalog.ts` regroupe les paroles officielles des 27 fiches publiées sur WordPress.
- `src/audioCatalog.ts` relie les 27 pistes aux médias WordPress et indique leur statut de validation, de langue et de droits.
- Les paroles wolof validées doivent rester intactes. Toute relecture linguistique doit préserver le texte source et être validée avant diffusion.
- Ne pas afficher de durée tant qu'elle n'a pas été confirmée.
- Relier chaque fiche à sa vidéo YouTube uniquement lorsque l'URL officielle correspondante est confirmée.

## Sécurité et publication
- Garder la politique de confidentialité publique et les coordonnées de contact accessibles depuis l'espace Parents.
- Vérifier le parcours des liens externes, les règles Google Play Families et les obligations applicables aux applications pour enfants.
- Tester avec des enfants uniquement sous supervision et sans collecter de données personnelles.
- Préparer la signature Android de production et le format AAB avant toute publication Google Play.
- Les workflows GitHub Actions contrôlent le code et publient un APK de test construit avec Gradle, accompagné de son SHA-256. Cet APK utilise une signature debug et n'est pas destiné à Google Play.

## Chaînes
- YouTube: https://www.youtube.com/@NianiKids
- TikTok: https://www.tiktok.com/@niani.kids

## Accessibilité et validation
- Les contrôles interactifs doivent annoncer leur fonction et leur état à TalkBack.
- Vérifier l'affichage avec les tailles de texte système agrandies et sur petits écrans Android.
- Garder des cibles tactiles confortables, avec un libellé explicite pour les boutons à icône.
- Les activités sont prévues avec un adulte; adapter le matériel à l'âge et ne jamais laisser un tout-petit sans surveillance.
- Avant publication : valider les traductions wolof, les liens externes, la politique de confidentialité et le parcours Google Play Families.


## Build Android sans EAS
Le workflow `.github/workflows/android-gradle-apk.yml` construit l'APK avec Expo Prebuild et Gradle, vérifie sa signature et publie l'APK ainsi que son SHA-256 dans une GitHub Release. La version 1.1.0 est une préversion de test interne, signée en debug : elle convient aux essais et à l'installation directe, mais pas à la publication Google Play. Une signature de production et un AAB seront nécessaires pour la distribution officielle.
