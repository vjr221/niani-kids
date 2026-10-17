# Niani Kids — inventaire des médias de l’application

Ce document distingue les fichiers réellement présents dans Git des visuels encore à produire. Les planches de référence générées pendant la conception ne remplacent jamais les fichiers individuels utilisables dans l’application.

## Fichiers déjà présents dans assets/

### Identité
- a_clean_graphic_png_logo_on_a_transparent_backgrou.png — logo utilisé dans l’en-tête de l’application.

### Samba
- Samba_portrait_et_nom.png — carte de présentation.
- Samba_vues_corps_entier.png — personnage utilisé dans le héros de l’accueil.
- Samba_expressions.png — planche d’expressions, à découper/exporter en fichiers individuels avant intégration.
- Samba_activites.png — planche d’activités, à examiner et découper si nécessaire.

### Awa
- Awa_portrait_et_nom.png — carte de présentation.
- Awa_vues_corps_entier.png — personnage utilisé dans le héros de l’accueil.
- Awa_expressions.png — planche d’expressions, à découper/exporter en fichiers individuels avant intégration.
- Awa_activites.png — planche d’activités, à examiner et découper si nécessaire.

### Bobo
- Bobo_portrait_et_nom.png — carte de présentation.
- Bobo_vues_corps_entier.png — personnage utilisé dans le héros de l’accueil.
- Bobo_expressions.png — planche d’expressions, à découper/exporter en fichiers individuels avant intégration.
- Bobo_activites.png — planche d’activités, à examiner et découper si nécessaire.

### Médias à identifier
Les fichiers grok_1791747228491.gif, grok_1791747239901.gif, grok_1791747324728.jpg, grok_1791747330145.jpg, grok_1791747341361.jpg, grok_1791747360863.jpg, grok_1791747372594.jpg, grok_1791747391937.jpg, grok_1791747633309.png, grok_1792185425044.jpg, grok_1792185430939.jpg et wWP46.png sont présents dans le dépôt, mais leur rôle doit être vérifié visuellement avant de les affecter à un écran.

## À produire ou à retrouver
- assets/brand/logo-icon.png — icône carrée dédiée à l’application Android.
- assets/characters/baobab.png — Baobab détouré, avec expression amicale.
- assets/backgrounds/village.png et assets/backgrounds/baobab-grove.png — décors adaptés à l’accueil et aux contes.
- Couvertures individuelles pour les comptines, berceuses et histoires.
- Illustrations séparées pour les jeux de couleurs, chiffres, formes, animaux, fruits et objets.
- Illustrations pour les états de réussite, réessai, absence de résultat et mode hors connexion.
- Fichiers audio finaux décrits dans docs/MEDIA-PRODUCTION-REGISTER.md.

## Règles d’intégration
1. Réutiliser les personnages officiels déjà présents et conserver leurs vêtements, couleurs et proportions.
2. Ne pas utiliser une planche multi-personnages comme une illustration unique de personnage.
3. Vérifier les dimensions, la transparence, les droits et le poids des fichiers.
4. Optimiser les images sans perte visible et privilégier WebP lorsque le pipeline mobile le permet.
5. Tester chaque visuel sur téléphone et sur fonds clairs.
6. Ne jamais référencer un fichier absent ou vide dans le code.
7. Pour le wolof, faire valider les paroles et la prononciation par un locuteur natif.
