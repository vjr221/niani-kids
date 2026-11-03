# Niani Kids — rapport de contrôle technique audio

Date du contrôle : 28 octobre 2026

## Périmètre vérifié

- Archive source : `Chansons Niani kids.zip` — extraction réussie.
- 29 fichiers MP3 repérés dans l’archive.
- 28 empreintes SHA-256 uniques parmi ces 29 MP3.
- 3 masters M4A séparés retrouvés dans les fichiers du projet.
- Catalogue de référence : `Liste_Niani_Kids_Catalogue_Complet_Chansons_Comptines.docx` — 25 versions, dont deux maquettes « Bonjour, bonjour ! ».

## Contrôle technique

Les métadonnées de chaque MP3 et des trois masters ont été lues avec ffprobe. Les fichiers possèdent des métadonnées audio lisibles; cela ne remplace pas une écoute éditoriale.

Les MP3 du ZIP sont en stéréo, 48 kHz, généralement à 192 kbit/s. Les trois masters séparés sont des fichiers M4A contenant de l’audio Opus stéréo à 48 kHz. Il faudra confirmer la compatibilité du lecteur Expo/Android et des navigateurs avant publication.

### Doublon exact

- `Les couleurs dansent.mp3`
- `Les couleurs dansent (2).mp3`

Ces deux fichiers ont la même empreinte SHA-256. Conserver une seule copie dans le catalogue de production, sans supprimer l’original de l’archive source.

## Trois masters prioritaires

| Fichier | Durée | Codec | SHA-256 |
|---|---:|---|---|
| `01 Bonjour Bonjour les amis.m4a` | 144,80 s | Opus | `e2c5f59e87c9380b3f4cd28840d7426fdb25e8cc793329d5ddf2b73f9776bf47` |
| `02 — Bienvenue chez Niani Kids.m4a` | 60,00 s | Opus | `46dd60dfd5f606a18e2bfb0c8a376c078284e590571928b2fec8f2cc2343b176` |
| `03 - NIANI! NIANI! — ÑU NGI FII!.m4a` | 60,00 s | Opus | `cd7a59ffd4b672e97c9aeec84c529f4be6c150a59a0edab21d32531c19e8ca78` |

Ces trois masters restent des références distinctes et prioritaires. Ne pas les remplacer par un MP3 de nom proche sans comparaison explicite.

## Statut éditorial

**Aucune piste n’est marquée comme validée à l’écoute dans ce rapport.** Le contrôle réalisé est technique. Il ne confirme pas que les paroles chantées correspondent au DOCX, que la prononciation wolof est correcte, que le mixage est adapté aux enfants de 0 à 6 ans, ni que les droits de diffusion commerciale sont documentés.

Avant activation dans l’application ou sur nianikids.com :

1. Écoute humaine intégrale de chaque version : voix, équilibre voix/instruments, saturation, bruit, structure, fin de piste et adéquation à l’âge.
2. Comparaison de l’audio avec les paroles originales du DOCX; consigner les écarts avec horodatages.
3. Relecture du wolof par une personne compétente/native.
4. Confirmation des droits d’utilisation, de reproduction et de diffusion commerciale.
5. Test sur Android et navigateur mobile : lecture, pause, reprise, fin, écoute répétée et réseau lent.
6. Prévisualisation en brouillon avant toute publication publique.

## Séquence de livraison

1. Valider le contenu et l’écoute des trois masters de référence.
2. Identifier et évaluer les autres versions MP3 du ZIP, en maintenant les deux maquettes Bonjour séparées.
3. Ajouter les seuls masters approuvés à l’application mobile sur une branche dédiée; conserver le bouton de lecture distinct de la synthèse vocale.
4. Tester sur appareil réel et produire un APK de prévisualisation.
5. Préparer sur WordPress une bibliothèque audio avec titres, paroles approuvées, langue, durée, visuel, droits et fichier.
6. Publier sur le site uniquement après contrôle éditorial, wolof, droits et test de lecture.
7. Ne pas modifier `main` ni publier automatiquement les pistes bloquées.

## Fichiers associés

Le registre CSV complet fourni séparément contient la durée, le codec, le format, le débit, la taille, le SHA-256 et les statuts QA des 29 MP3 et des trois masters.
