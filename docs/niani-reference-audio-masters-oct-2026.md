# Niani Kids — masters audio de référence

Date de réception : 26 octobre 2026.

Ces trois fichiers envoyés directement par l'équipe sont les références prioritaires à comparer aux exports antérieurs. Les durées et caractéristiques ci-dessous ont été vérifiées techniquement ; cela ne remplace pas l'écoute éditoriale.

| Ordre | Fichier de référence | Durée | Encodage | SHA-256 | Correspondance dans le catalogue |
|---|---|---:|---|---|---|
| 01 | `01 Bonjour Bonjour les amis.m4a` | 2:24.8 | Opus, stéréo, 48 kHz dans conteneur M4A | `e2c5f59e87c9380b3f4cd28840d7426fdb25e8cc793329d5ddf2b73f9776bf47` | Candidat pour `song-bonjour`; confirmer l'audio et les paroles avant association |
| 02 | `02 — Bienvenue chez Niani Kids.m4a` | 1:00 | Opus, stéréo, 48 kHz dans conteneur M4A | `46dd60dfd5f606a18e2bfb0c8a376c078284e590571928b2fec8f2cc2343b176` | Référence de la chanson de bienvenue ; il n'existe pas encore de fiche audio dédiée clairement correspondante |
| 03 | `03 - NIANI! NIANI! — ÑU NGI FII!.m4a` | 1:00 | Opus, stéréo, 48 kHz dans conteneur M4A | `cd7a59ffd4b672e97c9aeec84c529f4be6c150a59a0edab21d32531c19e8ca78` | Référence du générique ; créer/valider une fiche dédiée et vérifier les paroles wolof |

## Règles d'intégration

- Ces fichiers sont les versions de référence à privilégier face aux remix ou variantes portant des noms proches.
- Ne pas remplacer automatiquement le fichier « Bonjour Bonjour Niani (Remix) » ou les autres variantes par simple similarité de nom.
- Les binaires M4A ne sont pas encore dans les assets du dépôt. Ce commit documente les références ; il ne prétend pas activer la lecture.
- Ne pas inscrire une piste comme `approved` dans `src/audioCatalog.ts` avant validation éditoriale des paroles, du lien avec la fiche, des droits et des tests de lecture.
- Avant publication, vérifier la prise en charge du codec Opus dans le conteneur M4A par la chaîne de lecture cible. Si nécessaire, convertir les fichiers validés en AAC/M4A ou MP3 en conservant une copie immuable des masters reçus.
- Après validation, ajouter les fichiers aux assets, associer les bons `ContentItem.id`, lancer `npm run typecheck`, tester Android et iOS, puis préparer une release séparée.

## Validation restant à faire

1. Écoute comparative avec les anciennes versions.
2. Confirmation des paroles et de la langue, en particulier pour « ÑU NGI FII! ».
3. Confirmation des droits de diffusion dans l'application et sur le site.
4. Décision sur les fiches à créer pour « Bienvenue chez Niani Kids » et « ÑU NGI FII! ».
