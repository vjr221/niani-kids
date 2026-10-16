# Registre de production des médias — Niani Kids

Ce registre évite de confondre une fiche éditoriale, une voix de synthèse et un enregistrement musical final.

## État actuel vérifié dans le dépôt

- Les fiches de chansons et d'histoires sont dans `src/content.ts`.
- Le bouton « Écouter le texte » utilise `expo-speech` : il lit le texte à voix synthétique. Ce n'est pas un enregistrement chanté.
- Aucun fichier maître MP3/WAV n'est actuellement référencé dans le dépôt.
- Les illustrations originales des personnages et le logo ne sont pas encore présents dans `assets/`.
- Les textes wolof sont provisoires et doivent être validés par un locuteur natif avant publication.

## Organisation des fichiers à livrer

Utiliser ces chemins quand les fichiers validés seront disponibles :

```text
assets/
  brand/
    logo.png
    logo-icon.png
  characters/
    samba.png
    awa.png
    bobo.png
    baobab.png
  backgrounds/
    village.png
    baobab-grove.png
  audio/
    jingle-intro-master.mp3
    jingle-outro-master.mp3
    bonjour-bonjour-fr-master.mp3
    bonjour-bonjour-wo-master.mp3
    couleurs-fr-master.mp3
    couleurs-wo-master.mp3
    animaux-fr-master.mp3
    animaux-wo-master.mp3
    berceuse-fr-master.mp3
    berceuse-wo-master.mp3
```

Ne pas créer de fichier vide pour faire croire qu'un média existe. Ne référencer un fichier dans l'application qu'après l'avoir ajouté et vérifié.

## Priorité de production audio

| Priorité | Média | Livrable attendu | État |
| --- | --- | --- | --- |
| P0 | « Bienvenue chez Niani Kids » | Jingle instrumental + version chantée validée | Instrumental de démonstration signalé hors dépôt ; version chantée à finaliser |
| P1 | « Bonjour, bonjour ! » | Masters chantés français et wolof | À produire ; paroles wolof à faire valider |
| P2 | Les couleurs | Masters chantés français et wolof | À produire |
| P3 | Les animaux | Masters chantés français et wolof | À produire |
| P4 | Berceuse | Masters doux français et wolof | À produire |

## Contrat de validation d'un média

Avant d'intégrer un fichier :

1. Vérifier l'écoute complète, le volume, les coupures et le bruit.
2. Vérifier la prononciation, surtout pour le wolof, avec un locuteur natif.
3. Obtenir les droits d'utilisation commerciale et de diffusion des voix, de la musique et des éventuels échantillons.
4. Confirmer le nom de fichier, la langue, la durée et la version.
5. Tester le lancement, la pause/l'arrêt, le retour à l'application et l'absence de lecture fantôme.
6. Vérifier le comportement hors ligne si le fichier est livré dans l'application.

## Métadonnées minimales

Chaque enregistrement final doit avoir un titre, un identifiant stable, une langue (`fr` ou `wo`), une durée vérifiée, un chemin de fichier, une version, un statut de droits et un statut de validation linguistique.

## Règle produit

Tant qu'aucun enregistrement n'est livré, l'interface doit présenter honnêtement la lecture comme une lecture vocale du texte et non comme une chanson enregistrée. Les liens vers YouTube restent accompagnés d'une confirmation destinée aux parents.
