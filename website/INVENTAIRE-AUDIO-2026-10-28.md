# Niani Kids — inventaire audio et plan d’intégration
Date du contrôle : 2026-10-28

## Source de référence

- Archive fournie : `Chansons Niani kids.zip` (56 173 915 octets).
- Contrôle d’intégrité ZIP : réussi, aucune entrée corrompue détectée.
- Contenu : 29 fichiers MP3, dont 1 paire de copies strictement identiques.
- Catalogue de paroles de référence : `Liste_Niani_Kids_Catalogue_Complet_Chansons_Comptines.docx` (25 versions, avec les deux maquettes « Bonjour, bonjour ! »).
- Trois masters séparés à conserver en priorité :
  1. `01 Bonjour Bonjour les amis.m4a` — 144,80 s — Opus, 48 kHz, stéréo.
  2. `02 — Bienvenue chez Niani Kids.m4a` — 60,00 s — Opus, 48 kHz, stéréo.
  3. `03 - NIANI! NIANI! — ÑU NGI FII!.m4a` — 60,00 s — Opus, 48 kHz, stéréo.

Les masters sont des références distinctes. Ne pas les remplacer automatiquement par un MP3 au titre voisin.

## Contenu repéré dans le ZIP

- À table, bon appétit !
- Bienvenue chez Niani Kids V2
- Bonjour Bonjour Niani (Remix)
- Bonjour Bonjour Niani kids
- Bonjour, bonjour ! — V2
- Bonjour, bonjour ! — V3
- Bonjour, comment ça va
- Bouge et stop !
- Comptons jusqu’à 10
- Conte musical du Baobab
- Dors, petit cœur
- Je brosse mes petites dents — version B terminée
- Je lave mes mains
- Je m’habille tout seul
- Je range mes jouets
- Les animaux du Sénégal
- Les couleurs dansent
- Les couleurs dansent (2) — copie binaire exacte du fichier précédent
- Les formes
- Les fruits du Sénégal
- Les jours de la semaine
- Les légumes font la fête
- Ma famille, mes amis — génération terminée
- NIANI! NIANI! — ÑU NGI FII!
- Niani Kids, c’est parti !
- Nuyoo, nuyoo ! — Bonjour en français et wolof
- Quand je ris, quand je pleure
- S’il te plaît, merci !
- Tête, épaules, mains et pieds

## Résultats du contrôle technique

- Les 29 MP3 sont lisibles par l’outil de lecture des métadonnées audio.
- Tous les MP3 du ZIP rapportent 48 kHz et 2 canaux.
- Doublon exact confirmé par SHA-256 : `Les couleurs dansent.mp3` et `Les couleurs dansent (2).mp3`.
- Les deux fichiers « Bonjour, bonjour ! — V2 » et « Bonjour, bonjour ! — V3 » ont même durée et même taille, mais des empreintes différentes : ne pas les traiter comme des doublons sans écoute.
- Les métadonnées et les empreintes ne constituent pas une écoute perceptive.

## Statuts éditoriaux — règle stricte

À la date de ce fichier, **aucune chanson n’est déclarée validée à l’écoute**. Le contrôle fait confirme l’intégrité du ZIP, la lecture des métadonnées et le doublon binaire, pas la qualité artistique ni la correspondance paroles/audio.

Pour chaque piste, compléter :
1. Écoute intégrale : voix, équilibre voix/instruments, saturation/coupures, intro/outro, durée et adaptation 0–6 ans.
2. Comparaison du chant avec le DOCX, sans corriger silencieusement les paroles.
3. Relecture du wolof par une personne compétente/native.
4. Confirmation des droits/licences pour l’utilisation et la diffusion.
5. Décision explicite : validée / à corriger / à réécouter / doublon.

## Intégration mobile

La branche de travail actuelle utilise `src/audioCatalog.ts` comme garde éditoriale : une piste n’est jouable que si un asset local existe, que son statut est `approved`, que la langue est relue et que les droits sont confirmés.

Étapes suivantes :
1. Conserver les trois masters séparés comme références prioritaires.
2. Après validation, fournir des assets audio mobiles adaptés et les ajouter au dépôt sur une branche dédiée.
3. Relier chaque asset à l’identifiant de contenu exact ; ne pas se baser uniquement sur un nom de fichier.
4. Garder la synthèse vocale en solution de repli pour les fiches sans master validé.
5. Exécuter TypeScript, tests, build APK et essai de lecture sur appareil avant publication.

## Intégration site web / WordPress

Après validation des masters :
1. Ajouter les fichiers validés à la médiathèque WordPress, avec noms stables et métadonnées propres.
2. Créer/mettre à jour les fiches chansons avec titre, paroles validées, langue, durée, visuel, transcription/captions si disponibles et informations de droits.
3. Ajouter un lecteur audio accessible et adapté mobile ; ne pas publier les pistes « à réécouter ».
4. Vérifier que les URL audio sont publiques, HTTPS, stables et compatibles avec le lecteur.
5. Tester chaque fiche sur téléphone et ordinateur, puis vérifier SEO, accessibilité et temps de chargement.
6. Publier seulement après validation éditoriale et vérification des droits.

## Fichiers de suivi associés

Un tableur et un CSV de suivi ont été générés dans la conversation : `Niani_Kids_Inventaire_Audio_V1.xlsx` et `Niani_Kids_Inventaire_Audio_V1.csv`. Ils contiennent les durées, codecs, tailles, empreintes SHA-256 et statuts d’audit des 29 MP3 et des 3 masters séparés.
