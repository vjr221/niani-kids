# Niani Kids — inventaire des masters audio (26 octobre 2026)

Source reçue : `Chansons Niani kids.zip`. 29 fichiers MP3 inspectés techniquement.
Objectif : inventaire de préparation, pas encore catalogue de publication.

## Règles de validation
- Aucun enregistrement n'est automatiquement lié à une fiche de contenu par son nom seul.
- Langue, paroles, correspondance exacte avec une fiche, qualité d'écoute et droits doivent être vérifiés par l'équipe éditoriale.
- Tant qu'un master n'est pas auditionné et approuvé, il ne doit pas être activé dans `src/audioCatalog.ts`.
- Les fichiers audio binaires ne sont pas copiés dans ce dépôt par cette opération ; l'archive originale reste la source des masters.

## Fichiers reçus

| Fichier | Durée mesurée | Statut |
|---|---:|---|
| À table, bon appétit !.mp3 | 1:21 | À identifier et valider |
| Bienvenue chez Niani Kids V2.mp3 | 1:21 | À identifier et valider |
| Bonjour Bonjour Niani (Remix).mp3 | 2:27 | À comparer avec la variante proche |
| Bonjour Bonjour Niani kids.mp3 | 2:25 | À comparer avec la variante proche |
| Bonjour, bonjour ! — V2.mp3 | 1:15 | Variante à écouter |
| Bonjour, bonjour ! — V3.mp3 | 1:15 | Variante à écouter |
| Bonjour, comment ça va.mp3 | 1:15 | À identifier et valider |
| Bouge et stop !.mp3 | 1:15 | À identifier et valider |
| Comptons jusqu’à 10.mp3 | 1:15 | À identifier et valider |
| Conte musical du Baobab.mp3 | 1:15 | À identifier et valider |
| Dors, petit cœur.mp3 | 1:15 | À identifier et valider |
| Je brosse mes petites dents — version B terminée.mp3 | 1:15 | Variante B à valider |
| Je lave mes mains.mp3 | 1:15 | À identifier et valider |
| Je m’habille tout seul.mp3 | 1:15 | À identifier et valider |
| Je range mes jouets.mp3 | 1:15 | À identifier et valider |
| Les animaux du Sénégal.mp3 | 1:15 | À identifier et valider |
| Les couleurs dansent (2).mp3 | 1:19 | Doublon audio exact de « Les couleurs dansent.mp3 » |
| Les couleurs dansent.mp3 | 1:19 | Garder une seule copie après confirmation éditoriale |
| Les formes.mp3 | 1:15 | À identifier et valider |
| Les fruits du Sénégal.mp3 | 1:15 | À identifier et valider |
| Les jours de la semaine.mp3 | 1:13 | À identifier et valider |
| Les légumes font la fête.mp3 | 1:15 | À identifier et valider |
| Ma famille, mes amis — génération terminée.mp3 | 1:15 | Master marqué comme terminé, à valider |
| NIANI! NIANI! — ÑU NGI FII!.mp3 | 1:00 | Vérifier paroles wolof et version finale |
| Niani Kids, c’est parti !.mp3 | 1:15 | À identifier et valider |
| Nuyoo, nuyoo ! — Bonjour en français et wolof.mp3 | 1:15 | Vérifier les deux langues avec un locuteur compétent |
| Quand je ris, quand je pleure.mp3 | 1:15 | À identifier et valider |
| S’il te plaît, merci !.mp3 | 1:15 | À identifier et valider |
| Tête, épaules, mains et pieds.mp3 | 1:28 | À comparer au contenu « Tête, épaules et petits pieds » |
 
## Résultats techniques
- 29 fichiers MP3 présents.
- 28 empreintes audio distinctes après décodage ; une paire de fichiers est identique : `Les couleurs dansent.mp3` et `Les couleurs dansent (2).mp3`.
- Les deux fichiers « Bonjour Bonjour Niani » sont distincts et de durées différentes ; leur différence éditoriale n'est pas encore confirmée.
- Certains fichiers partagent une durée et un débit identiques. Cela ne suffit pas à prouver qu'ils sont identiques : écoute obligatoire.
- Les langues indiquées dans les noms de fichiers sont des indices, pas une validation linguistique.

## Étapes suivantes
1. Écoute éditoriale de chaque master, comparaison des variantes.
2. Validation des paroles, de la langue et du lien avec une fiche `ContentItem`.
3. Confirmation des droits d'utilisation pour l'application et le site.
4. Copie des masters retenus dans les assets de l'application, puis remplissage de `src/audioCatalog.ts` avec statut `approved` uniquement après validation.
5. Vérification de lecture sur Android et iOS avant toute release.
