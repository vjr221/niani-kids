# Niani Kids — application mobile
**Niani Kids — Les petites mélodies d’Afrique** est une application Expo / React Native / TypeScript pour les enfants de 0 à 6 ans, à utiliser avec un adulte.

## Modules
- Accueil ludique et découverte des quatre personnages : Samba, Awa, Bobo et le Baobab.
- Bibliothèque : comptines, berceuses, apprentissages et histoires.
- Jeux interactifs : couleurs, dénombrement, gestes pour la nature, étoiles de récompense enregistrées localement.
- Ateliers parent-enfant : arts, rythme, baobab des gentillesses, conte en images, danse.
- Favoris enregistrés sur l'appareil.
- Espace Parents avec accès aux chaînes officielles.
- Interface français/wolof en cours; faire valider les traductions wolof avant diffusion.
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
Les paroles de démonstration sont originales pour ce starter. Elles ne remplacent pas les masters audio ni les vidéos finalisées. Les paroles wolof doivent être validées par un locuteur natif. Relier chaque fiche à sa vidéo YouTube exacte avant publication.

## Sécurité et publication
- Ajouter une politique de confidentialité publique et une adresse de contact.
- Vérifier le parcours des liens externes, les règles Google Play Families et les obligations applicables aux applications pour enfants.
- Tester avec des enfants uniquement sous supervision et sans collecter de données personnelles.
- Configurer EAS Build et les secrets nécessaires pour produire un APK/AAB signé.
- Le workflow actuel valide le code et exporte le bundle Android; il ne publie pas encore d'APK signé.

## Chaînes
- YouTube: https://www.youtube.com/@NianiKids
- TikTok: https://www.tiktok.com/@niani.kids

## Accessibilité et validation
- Les contrôles interactifs doivent annoncer leur fonction et leur état à TalkBack.
- Vérifier l'affichage avec les tailles de texte système agrandies et sur petits écrans Android.
- Garder des cibles tactiles confortables, avec un libellé explicite pour les boutons à icône.
- Les activités sont prévues avec un adulte; adapter le matériel à l'âge et ne jamais laisser un tout-petit sans surveillance.
- Avant publication : valider les traductions wolof, les liens externes, la politique de confidentialité et le parcours Google Play Families.
