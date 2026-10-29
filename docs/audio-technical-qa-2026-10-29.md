# Niani Kids — audit technique des audios (29 octobre 2026)

## Résultat du contrôle automatisé

Archive source : `Chansons Niani kids.zip` (56 173 915 octets).
Catalogue de paroles : `Liste_Niani_Kids_Catalogue_Complet_Chansons_Comptines.docx`.
Références séparées : les trois masters M4A listés ci-dessous.

- 29 entrées MP3 extraites de l'archive.
- 28 contenus MP3 uniques par SHA-256 : `Les couleurs dansent.mp3` et `Les couleurs dansent (2).mp3` sont strictement identiques.
- Les 29 MP3 ont été décodés par FFmpeg sans erreur (code de sortie 0).
- Tous les MP3 et les 3 masters sont stéréo, 48 kHz.
- Les MP3 durent de 60,05 s à 147,24 s. Les trois masters durent 144,80 s, 60,00 s et 60,00 s.
- Plusieurs pistes ont un niveau de crête très proche de 0 dBFS (jusqu'à 0,0 dBFS après mesure). Cela ne prouve pas à lui seul une distorsion audible, mais justifie un contrôle d'écoute sur casque/enceintes.
- Le détecteur a relevé des passages d'au moins une seconde sous -45 dB sur certaines pistes. Cela peut être une pause musicale intentionnelle ; les débuts et fins doivent être écoutés avant toute correction.

## Statut de validation

**Contrôle technique automatisé terminé ; écoute éditoriale non validée.** Les outils de ce contrôle ont vérifié l'intégrité de lecture, les durées, les formats, les niveaux moyens/crêtes et les doublons. Ils n'ont pas validé les paroles réellement chantées, la prononciation, le contenu adapté aux 0–6 ans, ni les droits. Aucun titre ne doit donc passer à `approved` sur la seule base de ce rapport.

La transcription automatique ElevenLabs n'a pas été exécutée : le registre de production indique 263 crédits disponibles pour un besoin estimé à 412 crédits pour une seule piste. Ne pas relancer de transcription facturée sans confirmation du budget.

## Fichiers supplémentaires de l'archive à identifier

- `Bonjour Bonjour Niani kids.mp3` — 144,84 s.
- `Bonjour Bonjour Niani (Remix).mp3` — 147,24 s.
- `NIANI! NIANI! — ÑU NGI FII!.mp3` — 60,05 s.

Ne pas les associer automatiquement à un master par similitude de nom ; écouter et comparer d'abord.

## Trois masters séparés — préserver comme références prioritaires

| Fichier | Durée | SHA-256 | Décision |
|---|---:|---|---|
| `01 Bonjour Bonjour les amis.m4a` | 144,80 s | `e2c5f59e87c9380b3f4cd28840d7426fdb25e8cc793329d5ddf2b73f9776bf47` | Master prioritaire ; comparer au candidat « Bonjour » sans le remplacer |
| `02 — Bienvenue chez Niani Kids.m4a` | 60,00 s | `46dd60dfd5f606a18e2bfb0c8a376c078284e590571928b2fec8f2cc2343b176` | Master prioritaire ; identification et paroles à vérifier |
| `03 - NIANI! NIANI! — ÑU NGI FII!.m4a` | 60,00 s | `cd7a59ffd4b672e97c9aeec84c529f4be6c150a59a0edab21d32531c19e8ca78` | Master prioritaire ; paroles wolof et fiche dédiée à vérifier |

## Suite de production

1. Écouter intégralement chaque piste avec le lecteur de contrôle.
2. Comparer les paroles audio au catalogue de travail ; une transcription automatique n'est qu'une aide.
3. Faire relire le wolof par une personne compétente/native.
4. Confirmer les droits d'utilisation des textes, musiques, voix et fichiers.
5. Passer uniquement les pistes validées à `approved`, puis tester le lecteur dans l'application.
6. Publier sur WordPress uniquement après validation ; garder les candidats en statut privé/non public jusque-là.
