# Vérification des médias et de la version Android — 21 octobre 2026

## Vérification du commit de référence

Commit audité : `575e13377127811d59e85e51a16420a099e8081a`  
Contrôle qualité : [run 39640935069](https://github.com/vjr221/niani-kids/actions/runs/39640935069) — réussi.

Les étapes confirmées dans le run sont : installation des dépendances, contrôle de compatibilité Expo, TypeScript, validation des clés de traduction, validation du catalogue de contenus, validation du catalogue audio et export Expo Android.

**Portée :** ce run est le workflow de qualité; il ne contient pas d'étape de génération d'APK. Il ne prouve donc pas qu'un nouvel APK a été produit pour le commit `575e133`.

## Audio : décision de publication

Le code `src/audioCatalog.ts` déclare actuellement `audioCatalog: []`. Le composant de lecture audio utilise un vrai lecteur de média, mais aucune chanson n'est enregistrée comme master approuvé dans ce catalogue.

L'inventaire historique `docs/AUDIO-FILE-INVENTORY.md` signale des doublons binaires et un fichier WhatsApp distinct dont le contenu doit être identifié. Ces informations techniques ne suffisent pas à confirmer le titre, la langue, les paroles, les droits ou la qualité d'un master.

**Décision :** ne pas relier ces fichiers à des titres par ordre ou par nom. Chaque master doit être écouté, identifié, contrôlé pour les droits et approuvé avant d'être référencé par l'application.

## Visuels : décision d'intégration

Les images historiques des personnages et le logo sont présents dans `assets/`. Le manifeste `assets/graphics/manifest.json` répertorie les nouveaux originaux et leurs chemins cibles, mais son statut est `catalogued-not-yet-committed-as-binary-assets`.

**Décision :** ne pas ajouter d'import local vers les nouveaux chemins tant que les PNG correspondants ne sont pas réellement présents dans Git. Une fois les originaux disponibles, vérifier dimensions, transparence, lisibilité sur petits écrans et inclusion dans l'APK.

## Prochaines étapes vérifiables

1. Récupérer les masters originaux depuis leur source accessible et produire un inventaire écouté avec correspondance titre/langue.
2. Ajouter les fichiers graphiques originaux au dépôt, puis vérifier les chemins d'import.
3. Compléter l'audit de traduction pour les contenus éducatifs, en distinguant brouillon, en attente de relecture et validé.
4. Lancer le workflow Android de prévisualisation après les changements de code et confirmer la présence de l'artefact APK.
5. Installer la préversion sur un appareil Android réel; noter les résultats séparément de la réussite CI.

## Critères de fin

- Aucun master inconnu n'est déclaré prêt à lire.
- Aucun contenu wolof n'est déclaré validé sans relecture native.
- Aucun chemin d'image ne référence un fichier absent.
- Le commit testé, le résultat du workflow et l'empreinte du binaire sont consignés.
- La publication publique reste bloquée tant que les exigences de confidentialité, d'accessibilité et de test sur appareil réel ne sont pas satisfaites.
