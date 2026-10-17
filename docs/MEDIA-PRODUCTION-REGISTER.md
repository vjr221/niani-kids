# Registre de production des médias — Niani Kids

## État vérifié
- Les fiches de contenus sont définies dans `src/content.ts`.
- Le bouton « Écouter le texte » s’appuie sur `expo-speech` : il lit le texte avec une voix synthétique et ne remplace pas un master musical.
- Le logo et les images de Samba, Awa et Bobo sont maintenant présents dans `assets/` et utilisés par l’interface.
- Le propriétaire indique disposer de chansons générées avec ElevenLabs. Les fichiers audio ne sont pas encore visibles dans le dépôt ni dans la bibliothèque d’assets ElevenLabs accessible à cette session.
- Le Baobab individuel, les décors et les couvertures individuelles restent à intégrer après vérification/production.

## Convention de fichiers
```text
assets/
  brand/
    logo.png
    logo-icon.png
  characters/
    baobab.png
  backgrounds/
    village.png
    savane.png
    nuit.png
    interieur.png
  covers/
    bonjour-bonjour.png
    couleurs.png
    animaux.png
    berceuse.png
  audio/
    jingle-intro.mp3
    jingle-outro.mp3
    bonjour-bonjour-fr.mp3
    bonjour-bonjour-wo.mp3
    couleurs-fr.mp3
    couleurs-wo.mp3
    animaux-fr.mp3
    animaux-wo.mp3
    berceuse-fr.mp3
    berceuse-wo.mp3
```

Ce sont des chemins cibles uniquement : ne créer aucun fichier vide et ne référencer un chemin dans le code qu’après ajout du média réel.

## Priorité de production
| Priorité | Livrable | État |
| --- | --- | --- |
| P0 | Baobab compagnon détouré, cohérent avec les personnages | En production visuelle |
| P0 | Couvertures individuelles pour les chansons livrées | À produire après inventaire des masters |
| P0 | Masters ElevenLabs existants (audio final + métadonnées) | À récupérer et contrôler |
| P1 | Fonds de village, savane, nuit et intérieur | À produire ou retrouver |
| P1 | Cartes couleurs, chiffres, formes, animaux et objets | À produire ou retrouver |
| P2 | États UI et visuels promotionnels | À compléter selon les écrans |

## Contrôle des chansons ElevenLabs
Pour chaque master reçu :
1. Écouter le fichier complet, vérifier les coupures, le niveau sonore et la qualité du mix.
2. Relever le titre exact, la langue, la durée et la version.
3. Valider les paroles, surtout le wolof, avec un locuteur natif.
4. Vérifier les droits d’utilisation commerciale et de diffusion de la musique, de la voix et des éventuels échantillons selon les conditions du compte et du service.
5. Ajouter le master au dépôt, déclarer son chemin dans les données de contenu et connecter le lecteur audio à un vrai fichier, avec états lecture/pause/erreur.
6. Tester sur Android, y compris interruption, retour à l’application et comportement hors ligne.

Tant que les fichiers ne sont pas disponibles et testés, l’interface ne doit pas présenter la lecture synthétique comme une chanson enregistrée.
