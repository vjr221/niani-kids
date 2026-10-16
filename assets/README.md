# Niani Kids — assets visuels et audio mobile

Les médias originaux doivent être ajoutés au dépôt avant d'être référencés par l'application. Ne pas utiliser une capture d'une planche multi-personnages comme si elle était une illustration individuelle.

## Visuels attendus

- `brand/logo.png` — logo transparent pour l'en-tête.
- `brand/logo-icon.png` — icône carrée dédiée à Android/iOS.
- `characters/samba.png`, `characters/awa.png`, `characters/bobo.png`, `characters/baobab.png` — une image détourée par personnage.
- `backgrounds/village.png`, `backgrounds/baobab-grove.png` — décors pour l'accueil et les jeux.

Qualité cible : personnages PNG/WebP transparents de 512–1024 px ; icône carrée 1024 px. Vérifier la transparence et l'affichage sur écran clair et sombre avant intégration.

## Identité des personnages

- **Samba** : garçon, cheveux courts bouclés, sweat bleu.
- **Awa** : fille, longues tresses avec perles colorées et tenue d'inspiration sénégalaise.
- **Bobo** : garçon distinct, casquette rouge portée à l'envers, tee-shirt jaune.
- **Baobab** : personnage-arbre chaleureux, silhouette facilement reconnaissable.

## Audio

Le bouton « Écouter le texte » actuel utilise une voix de synthèse ; il ne constitue pas un enregistrement musical. Les masters doivent être placés dans `audio/` avec les noms décrits dans [le registre de production média](../docs/MEDIA-PRODUCTION-REGISTER.md). Ne pas référencer de fichier absent ou vide.

## Contrôle avant intégration

1. Confirmer que le fichier existe réellement dans Git.
2. Contrôler la qualité et les droits.
3. Tester le rendu sur téléphone.
4. Pour le wolof, faire valider les paroles et la prononciation par un locuteur natif.
