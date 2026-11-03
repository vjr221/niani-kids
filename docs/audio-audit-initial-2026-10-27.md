# Niani Kids — audit initial du catalogue audio
Date : 27 octobre 2026

## Sources prises en compte
- Archive reçue : `Chansons Niani kids.zip` (56 173 915 octets).
- Catalogue de référence des paroles : `Liste_Niani_Kids_Catalogue_Complet_Chansons_Comptines.docx`.
- Trois masters séparés, prioritaires et à conserver distincts du ZIP :
  1. `01 Bonjour Bonjour les amis.m4a`
  2. `02 — Bienvenue chez Niani Kids.m4a`
  3. `03 - NIANI! NIANI! — ÑU NGI FII!.m4a`

## Contrôle technique exécuté
- 29 entrées non-répertoire dans le ZIP, toutes détectées comme MP3.
- 3 masters séparés détectés en M4A/conteneur audio avec codec Opus.
- Tous les fichiers inspectés sont stéréo, 48 kHz.
- Un doublon binaire exact dans le ZIP : `Les couleurs dansent.mp3` et `Les couleurs dansent (2).mp3` (même SHA-256).
- Les noms, formats, durées et empreintes SHA-256 figurent dans le CSV d'inventaire local.

## Durées observées
### Trois masters séparés
| Fichier | Durée |
|---|---:|
| 01 Bonjour Bonjour les amis.m4a | 144,80 s |
| 02 — Bienvenue chez Niani Kids.m4a | 60,00 s |
| 03 - NIANI! NIANI! — ÑU NGI FII!.m4a | 60,00 s |

### Correspondances candidates — non confirmées à l'écoute
- Master 01 (144,80 s) ressemble par le titre et la durée à `Bonjour Bonjour Niani kids.mp3` (144,84 s), mais l'identité audio n'a pas été prouvée.
- Master 02 (60,00 s) ne correspond pas en durée à `Bienvenue chez Niani Kids V2.mp3` (81,02 s). Garder le master séparé comme référence prioritaire et ne pas remplacer l'un par l'autre sans comparaison.
- Master 03 (60,00 s) a une durée proche de `NIANI! NIANI! — ÑU NGI FII!.mp3` (60,05 s), mais l'identité audio n'a pas été prouvée.

## Statut éditorial réel
**Aucune piste n'est marquée « validée à l'écoute » à ce stade.** Le contrôle réalisé confirme la lisibilité technique et les métadonnées, pas la qualité musicale, la prononciation ni la correspondance intégrale entre audio et paroles. La transcription automatique des trois masters et une écoute humaine comparative restent nécessaires. Toute formulation en wolof doit être relue par une personne compétente/native avant publication.

## Règles d'intégration mobile et site
1. Conserver les 3 masters dans un registre distinct et prioritaire.
2. Ne pas rendre une piste publiquement disponible tant que son fichier, son texte associé, la revue linguistique et les droits ne sont pas confirmés.
3. Dans l'application mobile, intégrer les masters approuvés comme fichiers audio locaux avec un lecteur natif, et tester lecture/pause/reprise/progression/offline sur Android.
4. Sur nianikids.com, publier uniquement les mêmes pistes approuvées, avec titre, langue, durée, paroles vérifiées, visuel et lecteur accessible.
5. Ne jamais écraser ni supprimer les maquettes candidates; conserver la provenance et l'historique des décisions.
