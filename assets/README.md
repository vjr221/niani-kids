# Niani Kids — inventaire des médias de l’application

Ce registre décrit les fichiers réellement présents dans le dépôt, les planches à examiner et les éléments à produire. Les planches de référence ne remplacent pas des fichiers individuels prêts à intégrer.

## Identité et personnages déjà présents dans assets/

- `a_clean_graphic_png_logo_on_a_transparent_backgrou.png` — logo utilisé dans l’en-tête.
- Samba : `Samba_portrait_et_nom.png`, `Samba_vues_corps_entier.png`, `Samba_expressions.png`, `Samba_activites.png`.
- Awa : `Awa_portrait_et_nom.png`, `Awa_vues_corps_entier.png`, `Awa_expressions.png`, `Awa_activites.png`.
- Bobo : `Bobo_portrait_et_nom.png`, `Bobo_vues_corps_entier.png`, `Bobo_expressions.png`, `Bobo_activites.png`.

Les portraits et vues en pied sont utilisés dans l’application. Les planches d’expressions/activités doivent être inspectées puis exportées en images séparées avant d’utiliser chaque pose dans l’interface.

## Fichiers visuels à identifier

Les médias suivants sont présents mais leur contenu précis doit être inspecté avant de les affecter à un écran :
- `grok_1791747228491.gif`, `grok_1791747239901.gif`
- `grok_1791747324728.jpg`, `grok_1791747330145.jpg`, `grok_1791747341361.jpg`, `grok_1791747360863.jpg`, `grok_1791747372594.jpg`, `grok_1791747391937.jpg`
- `grok_1791747633309.png`, `grok_1792185425044.jpg`, `grok_1792185430939.jpg`, `wWP46.png`

## Prochains visuels à produire ou retrouver

### Priorité P0 — application
- Icône Android carrée dérivée du logo officiel, sans texte trop petit.
- Baobab compagnon détouré et cohérent avec les personnages officiels.
- Décors individuels : village sénégalais, baobab/savane, nuit étoilée, intérieur familial.
- Couvertures individuelles pour chaque comptine, berceuse et conte réellement disponible.
- États UI : contenu bientôt disponible, réussite, réessai, hors connexion et chargement.

### Priorité P1 — jeux et apprentissage
- Cartes séparées : couleurs, chiffres, formes, lettres, animaux, fruits et objets du quotidien.
- Illustrations d’activités : coloriage, peinture, puzzle et premiers gestes.
- Icônes catégories et contrôles du lecteur, en privilégiant des icônes vectorielles quand cela suffit.

### Priorité P2 — communication
- Bannière d’accueil, visuel d’onboarding et miniatures de contenus.
- Visuels de l’espace parents, sans images trop chargées ni textes minuscules.

## Audio généré avec ElevenLabs

Le propriétaire indique avoir désormais des chansons générées avec ElevenLabs. Aucun fichier audio correspondant n’est actuellement visible dans le dépôt Git, et la bibliothèque d’assets ElevenLabs accessible à cette session n’a retourné aucun fichier audio. Les masters doivent donc être exportés/partagés et identifiés avant intégration.

Pour chaque chanson, conserver : titre, identifiant stable, langue, durée, format, version, paroles validées, statut de droits et statut de validation linguistique. Préférer MP3 de bonne qualité pour l’application, avec un nom stable tel que `assets/audio/bonjour-bonjour-fr.mp3`. Ne pas créer de faux fichiers ni annoncer une chanson intégrée avant d’avoir le fichier réel et d’avoir testé la lecture.

## Règles d’intégration

1. Préserver le design officiel des personnages : vêtements, couleurs, cheveux, accessoires et proportions.
2. Ne pas employer une planche multi-images comme si elle était un PNG individuel.
3. Vérifier transparence, cadrage, dimensions, poids, droits et lisibilité sur petit écran.
4. Optimiser les images et n’utiliser l’animation que si elle apporte une vraie valeur sans alourdir excessivement l’APK.
5. Ne référencer aucun fichier absent du dépôt.
6. Tester l’interface sur Android après chaque lot de médias.
7. Faire relire les paroles et la prononciation wolof par un locuteur natif avant publication.
