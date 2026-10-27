# Niani Kids — audit initial des fichiers audio
Date de contrôle : 2026-10-27

## Périmètre et statut

- Archive analysée : `Chansons Niani kids.zip` (56,173,915 octets).
- Catalogue éditorial de référence : `Liste_Niani_Kids_Catalogue_Complet_Chansons_Comptines.docx` (25 versions répertoriées).
- Archive : 29 entrées MP3, 56,555,512 octets audio extraits.
- Contrôle technique : les 29 MP3 sont lisibles par ffprobe, en stéréo, 48 kHz, codec MP3.
- Doublon exact : `Les couleurs dansent.mp3` et `Les couleurs dansent (2).mp3` ont le même SHA-256 (`1fc6dff61752e2b1af8a9811462edb61d7fc474108f3eee2fef0a51f7958d9f0`). Conserver une seule copie canonique, garder la seconde en archive si nécessaire.
- Attention : les contrôles de conteneur, durée et empreinte ne remplacent pas une écoute perceptive. Les paroles des fichiers n'ont pas encore été vérifiées par transcription/écoute indépendante. Aucun morceau ne doit être marqué « validé éditorialement » sur cette seule base.

## Les trois masters séparés — priorité et référence

Ces trois fichiers fournis séparément doivent toujours être conservés comme masters de référence, indépendamment des versions MP3 de l'archive.

| Master | Durée | Codec détecté dans le conteneur M4A | Échantillonnage | Canaux | Taille | SHA-256 |
|---|---:|---|---:|---:|---:|---|
| `01 Bonjour Bonjour les amis.m4a` | 144,80 s | Opus | 48 kHz | 2 | 2 454 344 octets | `e2c5f59e87c9380b3f4cd28840d7426fdb25e8cc793329d5ddf2b73f9776bf47` |
| `02 — Bienvenue chez Niani Kids.m4a` | 60,00 s | Opus | 48 kHz | 2 | 1 051 815 octets | `46dd60dfd5f606a18e2bfb0c8a376c078284e590571928b2fec8f2cc2343b176` |
| `03 - NIANI! NIANI! — ÑU NGI FII!.m4a` | 60,00 s | Opus | 48 kHz | 2 | 1 044 770 octets | `cd7a59ffd4b672e97c9aeec84c529f4be6c150a59a0edab21d32531c19e8ca78` |

The masters are not byte-identical to similarly titled MP3 files in the ZIP. Do not overwrite one with the other. Because the M4A files contain Opus audio, test target Android playback and transcode to AAC/M4A or MP3 if required by the app player; retain the originals unchanged.

## Archive inventory — 29 MP3 entries

| File | Duration | Review note |
|---|---:|---|
| `Bonjour Bonjour Niani (Remix).mp3` | 147.24 s | Extra variant; identify by listening |
| `Bonjour Bonjour Niani kids.mp3` | 144.84 s | Candidate related to Bonjour master; not confirmed |
| `À table, bon appétit !.mp3` | 81.02 s | Match to catalogue title by filename only |
| `Bienvenue chez Niani Kids V2.mp3` | 81.02 s | Keep separate from the 60 s master |
| `Bonjour, bonjour ! — V2.mp3` | 75.02 s | Candidate version; verify which maquette |
| `Bonjour, bonjour ! — V3.mp3` | 75.02 s | Candidate version; verify which maquette |
| `Bonjour, comment ça va.mp3` | 75.02 s | Candidate catalogue match |
| `Bouge et stop !.mp3` | 75.02 s | Candidate catalogue match |
| `Comptons jusqu’à 10.mp3` | 75.02 s | Candidate catalogue match |
| `Conte musical du Baobab.mp3` | 75.02 s | Candidate catalogue match |
| `Dors, petit cœur.mp3` | 75.02 s | Candidate catalogue match |
| `Je brosse mes petites dents — version B terminée.mp3` | 75.02 s | Candidate successful version B |
| `Je lave mes mains.mp3` | 75.02 s | Candidate catalogue match |
| `Je m’habille tout seul.mp3` | 75.02 s | Candidate catalogue match |
| `Je range mes jouets.mp3` | 75.02 s | Candidate catalogue match |
| `Les animaux du Sénégal.mp3` | 75.02 s | Candidate catalogue match |
| `Les couleurs dansent.mp3` | 79.03 s | Canonical filename candidate; exact duplicate of next entry |
| `Les couleurs dansent (2).mp3` | 79.03 s | Exact duplicate; SHA-256 identical |
| `Les formes.mp3` | 75.02 s | Candidate catalogue match |
| `Les fruits du Sénégal.mp3` | 75.02 s | Candidate catalogue match |
| `Les jours de la semaine.mp3` | 73.03 s | Candidate catalogue match |
| `Les légumes font la fête.mp3` | 75.02 s | Candidate catalogue match |
| `Ma famille, mes amis — génération terminée.mp3` | 75.02 s | Candidate catalogue match |
| `Niani Kids, c’est parti !.mp3` | 75.02 s | Candidate catalogue match |
| `NIANI! NIANI! — ÑU NGI FII!.mp3` | 60.05 s | Similarly titled master exists separately; listen and compare |
| `Nuyoo, nuyoo ! — Bonjour en français et wolof.mp3` | 75.02 s | Candidate catalogue match |
| `Quand je ris, quand je pleure.mp3` | 75.02 s | Candidate catalogue match |
| `S’il te plaît, merci !.mp3` | 75.02 s | Candidate catalogue match |
| `Tête, épaules, mains et pieds.mp3` | 88.03 s | Candidate catalogue match |

## Ordre de validation

1. Écoute réelle de chaque MP3 et des trois masters séparés.
2. Comparaison des paroles entendues avec le DOCX, avec les divergences notées sans réécrire les paroles.
3. Comparaison dédiée des trois masters avec les variantes aux noms proches.
4. Faire relire le wolof par une personne compétente/native avant publication.
5. Marquer chaque titre : `à écouter`, `à vérifier`, `validé éditorialement`, `validé pour publication`. Droits et validation linguistique doivent rester des contrôles séparés.
6. Intégrer uniquement les titres validés à l'application mobile, tester lecture réelle sur Android, puis préparer l'intégration au site WordPress Niani Kids.

## État de publication

Aucun des 29 MP3 ni des trois masters n'est déclaré validé à l'écoute dans ce rapport. L'audit actuel confirme seulement la présence, la lisibilité technique, les durées, le format détecté et le doublon exact. La branche de travail est distincte de `main`; ne pas fusionner ni publier automatiquement les audios avant validation.
