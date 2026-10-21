# Niani Kids — registre des médias de l’application

Ce dossier contient les sources visuelles de la marque. Les médias doivent être référencés uniquement après vérification de leur existence, de leur rendu et de leur rôle. Ne pas utiliser une planche multi-personnages comme illustration individuelle.

## Médias présents dans le dépôt

| Fichier | Usage | État |
|---|---|---|
| `a_clean_graphic_png_logo_on_a_transparent_backgrou.png` | Logo transparent de l’en-tête | Intégré |
| `Samba_portrait_et_nom.png` | Carte portrait de Samba | Intégré |
| `Awa_portrait_et_nom.png` | Carte portrait d’Awa | Intégré |
| `Bobo_portrait_et_nom.png` | Carte portrait de Bobo | Intégré |
| `Samba_vues_corps_entier.png` | Illustration de Samba dans le héros | Intégré |
| `Awa_vues_corps_entier.png` | Illustration d’Awa dans le héros | Intégré |
| `Bobo_vues_corps_entier.png` | Illustration de Bobo dans le héros | Intégré |
| `Samba_activites.png`, `Awa_activites.png`, `Bobo_activites.png` | Illustrations d’activités à affecter à des écrans précis | Disponibles, à intégrer après inspection |
| `Samba_expressions.png`, `Awa_expressions.png`, `Bobo_expressions.png` | Expressions pour retours de jeu et états émotionnels | Disponibles, à intégrer après inspection |

Les fichiers `grok_*` et `wWP46.png` restent à identifier visuellement avant utilisation. Ne pas supposer qu’ils représentent un personnage ou une icône d’application d’après leur nom.

## Visuels à préparer

- `brand/logo-icon.png` — icône carrée dédiée à Android/iOS, 1024 × 1024 px.
- `characters/baobab.png` — Baobab-guide détouré, silhouette reconnaissable.
- `backgrounds/village.png` — décor d’accueil léger.
- `backgrounds/baobab-grove.png` — décor de jeux et de contes.
- Couvertures individuelles pour comptines, berceuses, histoires et apprentissages.
- Icônes cohérentes pour les catégories et les commandes du lecteur.

## Identité des personnages

- **Samba** : garçon, cheveux courts bouclés, sweat bleu.
- **Awa** : fille, longues tresses avec perles colorées et tenue d’inspiration sénégalaise.
- **Bobo** : garçon distinct, casquette rouge portée à l’envers, tee-shirt jaune.
- **Baobab** : personnage-arbre chaleureux, guide/conteur de l’univers.

## Optimisation et contrôle

1. Préférer PNG/WebP de 512–1024 px pour les personnages détourés.
2. Utiliser une icône carrée dédiée, avec fond contrôlé, pour Android/iOS.
3. Compresser les images et éviter d’intégrer de gros GIF si une image statique suffit.
4. Vérifier les dimensions, la transparence, le contraste et le cadrage sur un petit écran.
5. N’ajouter aucun chemin `require(...)` tant que le fichier n’existe pas dans Git.
6. Tester le build Android après chaque lot d’images.

## Audio

Le bouton « Écouter le texte » utilise une voix de synthèse ; il ne constitue pas un enregistrement musical. Les masters doivent être placés dans `audio/` avec les noms décrits dans [le registre de production média](../docs/MEDIA-PRODUCTION-REGISTER.md). Ne pas référencer de fichier absent ou vide.

Pour le wolof, faire valider les paroles et la prononciation par un locuteur natif avant diffusion.


## Référence de marque obligatoire

Consulter la [bible d'identité visuelle](../docs/IDENTITE-VISUELLE.md) avant toute nouvelle illustration, miniature, vidéo ou écran. Les portraits et vues en pied individuels listés ci-dessus sont les références canoniques ; une image de scène ne doit pas redéfinir le visage, la coiffure, la tenue ou les couleurs signatures d'un personnage. Le logo transparent existant est la source de marque à privilégier ; ne pas le redessiner avec un générateur.

Pour le portail web, le logo est aussi utilisé comme favicon et image de partage. Avant une publication publique, vérifier son cadrage sur fond clair et sombre, ainsi que l'aperçu des liens sur les réseaux sociaux.
