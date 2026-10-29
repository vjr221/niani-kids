# Niani Kids — contrôle audio technique et préparation mobile
Date du contrôle : 29 octobre 2026
Source MP3 : `Chansons Niani kids.zip` (archive originale de 56 173 915 octets)
Masters de référence : trois fichiers M4A transmis séparément et conservés comme priorité.

## Résultat du contrôle technique

- 29 entrées MP3 dans le ZIP.
- 28 empreintes SHA-256 distinctes.
- Un doublon binaire exact : `Les couleurs dansent.mp3` et `Les couleurs dansent (2).mp3`. Les empreintes SHA-256 sont identiques ; conserver une seule copie de travail, sans supprimer l'original de l'archive.
- Tous les MP3 ont été ouverts et analysés par FFprobe/FFmpeg : codec MP3, stéréo, 48 kHz.
- Durées mesurées : 60,05 s à 147,24 s.
- Niveau moyen mesuré : environ -18,3 à -14,0 dBFS ; crêtes mesurées de 0,0 à -0,7 dBFS. Ce contrôle de niveau ne remplace pas une écoute et ne suffit pas à conclure à une absence de distorsion.
- Plusieurs pistes présentent une courte zone de silence au début ou à la fin ; réécouter les attaques et fins, notamment pour confirmer qu'aucune syllabe ou note n'est coupée.

## Les trois masters prioritaires

| Fichier source | Durée | Caractéristiques | Décision actuelle |
|---|---:|---|---|
| `01 Bonjour Bonjour les amis.m4a` | 144,8 s | Opus, stéréo, 48 kHz | Master de référence ; comparer aux variantes « Bonjour » du ZIP et vérifier les paroles |
| `02 — Bienvenue chez Niani Kids.m4a` | 60 s | Opus, stéréo, 48 kHz | Master de référence ; vérifier la correspondance avec la fiche dédiée |
| `03 - NIANI! NIANI! — ÑU NGI FII!.m4a` | 60 s | Opus, stéréo, 48 kHz | Master de référence ; vérifier les paroles et la prononciation wolof |

Les masters séparés ont priorité sur les variantes MP3 au nom similaire. Les fichiers originaux sont conservés à l'identique ; toute conversion destinée à l'application doit être produite dans un fichier dérivé, jamais en écrasant le master.

## Identification des 25 entrées

Les 25 titres/versions attendus sont présents dans l'archive selon leurs noms de fichiers, avec variantes pour les deux « Bonjour, bonjour ! ». Cela confirme une correspondance de nom, pas encore la correspondance exacte des paroles chantées.

- « Bonjour, bonjour ! — V2 » et « Bonjour, bonjour ! — V3 » restent deux variantes distinctes à comparer.
- « Bonjour Bonjour Niani kids » et « Bonjour Bonjour Niani (Remix) » restent séparés des deux variantes V2/V3 jusqu'à écoute comparative.
- « Les couleurs dansent (2) » est un doublon binaire de « Les couleurs dansent ».
- « Bienvenue chez Niani Kids V2.mp3 » ne doit pas remplacer automatiquement le master M4A séparé.
- « Je brosse mes petites dents — version B terminée.mp3 » correspond par son nom à la version B attendue ; la qualité et les paroles restent à valider.
- « NIANI! NIANI! — ÑU NGI FII!.mp3 » et son master M4A séparé sont deux fichiers distincts ; ne pas substituer l'un à l'autre sans comparaison.

## Comparaison technique des masters avec les MP3 du ZIP

Une comparaison automatique de l'enveloppe audio après décodage a été effectuée pour les trois paires candidates. C'est un indice de similarité, pas une écoute ni une preuve juridique de provenance.

| Master | MP3 candidat | Résultat de similarité d'enveloppe | Interprétation prudente |
|---|---|---:|---|
| Bonjour (M4A, 144,8 s) | `Bonjour Bonjour Niani kids.mp3` (144,84 s) | 0,977 ; décalage estimé ≈ 0,02 s | Très forte ressemblance : probablement le même rendu exporté dans un autre format. Garder le M4A comme référence. |
| Bonjour (M4A, 144,8 s) | `Bonjour Bonjour Niani (Remix).mp3` (147,24 s) | 0,148 | Ne pas considérer comme le même master ; comparer à l'écoute. |
| Bienvenue (M4A, 60 s) | `Bienvenue chez Niani Kids V2.mp3` (81,02 s) | 0,143 | Les durées et le signal ne correspondent pas suffisamment pour déclarer une même version. |
| Générique (M4A, 60 s) | `NIANI! NIANI! — ÑU NGI FII!.mp3` (60,05 s) | 0,210 | Malgré le titre et la durée proches, le signal n'est pas suffisamment similaire pour fusionner les fichiers. |

Ces résultats renforcent la règle : les trois M4A restent les masters de référence, mais le MP3 de bienvenue et le MP3 du générique doivent rester des variantes distinctes jusqu'à écoute comparative.

## Statut de validation

**Contrôle technique effectué ; validation d'écoute éditoriale non terminée.** L'analyse automatique confirme que les fichiers sont décodables et fournit les durées, niveaux et empreintes. Elle ne peut pas, à elle seule, certifier les paroles, la prononciation, la qualité artistique, l'adaptation aux 0–6 ans ni les droits.

Avant activation dans l'application :
1. écouter intégralement chaque morceau et réécouter le début/la fin ;
2. comparer les paroles enregistrées au DOCX de référence ;
3. faire relire les passages wolof par une personne compétente ;
4. confirmer les droits d'utilisation dans l'application et sur le site ;
5. convertir les trois masters Opus/M4A en un format testé sur les appareils cibles si nécessaire ;
6. seulement après ces validations, renseigner `assetPath`, lier chaque piste à un `ContentItem.id`, puis lancer typecheck et tests de lecture Android/iOS.

## État de l'application mobile

Cette branche prépare le catalogue et les contrôles ; elle **n'embarque pas encore les binaires audio** et n'active aucune piste non approuvée. L'intégration binaire et le test de lecture restent nécessaires avant de générer un nouvel APK. L'intégration au site Niani Kids sera faite après la validation et l'intégration mobile, conformément à l'ordre du projet.
