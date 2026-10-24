# Niani Kids — registre des médias de l’application

Ce dossier contient les médias embarqués et les références de production. Les nouveaux visuels reçus en octobre 2026 sont catalogués dans `graphics/manifest.json`; ils ne doivent être considérés comme embarqués dans l’APK qu’après dépôt des fichiers binaires et réussite d’une compilation sur ce commit. Les médias ne doivent être référencés qu’après vérification de leur existence, de leur rendu et de leur rôle. Ne jamais utiliser une planche multi-personnages comme illustration individuelle.

## Médias présents et utilisés dans l’interface

| Fichier | Usage actuel | État |
|---|---|---|
| `a_clean_graphic_png_logo_on_a_transparent_backgrou.png` | Logo de l’en-tête | Intégré — transparence à confirmer visuellement |
| `Samba_portrait_et_nom.png` | Carte portrait de Samba | Intégré |
| `Awa_portrait_et_nom.png` | Carte portrait d’Awa | Intégré |
| `Bobo_portrait_et_nom.png` | Carte portrait de Bobo | Intégré |
| `Samba_vues_corps_entier.png` | Illustration de Samba dans l’accueil | Intégré |
| `Awa_vues_corps_entier.png` | Illustration d’Awa dans l’accueil | Intégré |
| `Bobo_vues_corps_entier.png` | Illustration de Bobo dans l’accueil | Intégré |
| `Samba_activites.png`, `Awa_activites.png`, `Bobo_activites.png` | Illustrations d’activités à affecter à des écrans précis | Disponibles ; vérifier le rendu et l’affectation |
| `Samba_expressions.png`, `Awa_expressions.png`, `Bobo_expressions.png` | Expressions et états émotionnels | Disponibles ; intégration écran par écran à poursuivre |

Les fichiers `grok_*` et `wWP46.png` restent à identifier visuellement avant toute utilisation. Ne pas supposer qu’ils représentent un personnage ou une icône d’application d’après leur nom.

## Nouveaux visuels reçus — octobre 2026

Voir [`graphics/manifest.json`](./graphics/manifest.json) et [`graphics/README.md`](./graphics/README.md).

- Personnages : variantes de Samba, Awa, Bobo et planches d’expressions du Baobab.
- Logos : logo rond et propositions de texte 3D.
- Bannières : compositions larges pour les usages web et sociaux.
- Planches composites : références de marque uniquement, jamais des portraits individuels.

**État d’intégration :** le catalogue et les chemins cibles sont suivis dans Git, mais les nouveaux fichiers PNG du lot ne sont pas encore tous ajoutés comme fichiers binaires au dépôt. Ne pas ajouter de `require(...)` vers un fichier absent. L’intégration des visuels distants dans les cartes ne prouve pas que les fichiers sont embarqués dans l’APK.

## Visuels restant à préparer ou valider

- Icône carrée dédiée à Android/iOS, 1024 × 1024 px, avec zone de sécurité vérifiée.
- Baobab détouré en image individuelle et test de rendu dans l’accueil et le lecteur de contes.
- Décors légers pour l’accueil et les contes.
- Couvertures distinctes pour comptines, berceuses, histoires et apprentissages.
- Vérification du canal alpha du logo annoncé comme transparent.

## Identité des personnages

- **Samba** : garçon, cheveux courts bouclés, sweat bleu.
- **Awa** : fille, longues tresses avec perles colorées et tenue d’inspiration sénégalaise.
- **Bobo** : garçon distinct, casquette rouge portée à l’envers, tee-shirt jaune.
- **Baobab** : personnage-arbre chaleureux, guide/conteur de l’univers.

## Optimisation et contrôle

1. Préférer PNG/WebP de 512–1024 px pour les personnages détourés.
2. Utiliser une icône carrée dédiée, avec fond contrôlé, pour Android/iOS.
3. Compresser les images et éviter d’intégrer de gros GIF si une image statique suffit.
4. Vérifier les dimensions, la transparence, le contraste et le cadrage sur petit écran.
5. N’ajouter aucun chemin `require(...)` tant que le fichier n’existe pas dans Git.
6. Tester le build Android après chaque lot d’images.

## Audio

Le bouton « Écouter le texte » utilise une voix de synthèse ; il ne constitue pas un enregistrement musical. Les masters doivent être placés dans `audio/` avec les noms décrits dans [le registre de production média](../docs/MEDIA-PRODUCTION-REGISTER.md). Ne pas référencer de fichier absent ou vide.

Pour le wolof, faire valider les paroles et la prononciation par un locuteur natif avant diffusion.

## Référence de marque obligatoire

Consulter la [bible d'identité visuelle](../docs/IDENTITE-VISUELLE.md) avant toute nouvelle illustration, miniature, vidéo ou écran. Les portraits et vues en pied individuels listés ci-dessus sont les références canoniques ; une image de scène ne doit pas redéfinir le visage, la coiffure, la tenue ou les couleurs signatures d'un personnage. Le logo transparent existant est la source de marque à privilégier ; ne pas le redessiner avec un générateur.

Pour le portail web, le logo est aussi utilisé comme favicon et image de partage. Avant une publication publique, vérifier son cadrage sur fond clair et sombre, ainsi que l'aperçu des liens sur les réseaux sociaux.
