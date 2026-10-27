# Niani Kids — registre de contrôle audio

Date du contrôle : 27 octobre 2026

## Périmètre
- Archive `Chansons Niani kids.zip` : 29 fichiers MP3 examinés par métadonnées.
- Catalogue de référence : 25 versions, dont deux maquettes « Bonjour, bonjour ! ».
- Masters reçus séparément et conservés comme références distinctes : 3 fichiers M4A.

## Résultats techniques
- Fichiers MP3 présents dans l’archive : 29.
- Empreintes SHA-256 distinctes : 28.
- Groupe(s) de doublons exacts : Les couleurs dansent.mp3 + Les couleurs dansent (2).mp3.
- Tous les MP3 de l’archive et les trois M4A passent l’inspection `ffprobe` : conteneur décodable, durée, codec et pistes audio détectés.
- Les MP3 inspectés sont stéréo, 48 kHz. Les M4A des trois masters contiennent un flux Opus stéréo 48 kHz; le suffixe `.m4a` ne garantit donc pas à lui seul la compatibilité avec tous les lecteurs mobiles. Une conversion AAC de test sera à prévoir avant activation dans l’application.

## Limite essentielle
Ce contrôle est technique, pas une écoute éditoriale. Aucun titre n’est marqué « validé pour publication » : la qualité perceptive, la prononciation, le contenu réellement chanté et la correspondance complète aux paroles n’ont pas été confirmés par une écoute humaine. Le registre conserve donc `À écouter — non validé` et `En attente`.

## Correspondance des trois masters
1. `01 Bonjour Bonjour les amis.m4a` — 144,80 s; candidat accueil / « Bonjour, bonjour ! », association provisoire à confirmer.
2. `02 — Bienvenue chez Niani Kids.m4a` — 60,00 s; candidat « Bienvenue chez Niani Kids », association provisoire à confirmer.
3. `03 - NIANI! NIANI! — ÑU NGI FII!.m4a` — 60,00 s; candidat chanson signature, association provisoire à confirmer.

Les trois masters sont suivis séparément du ZIP et ne seront pas remplacés par un fichier de nom voisin.

## Points de vigilance
- `Les couleurs dansent.mp3` et `Les couleurs dansent (2).mp3` sont identiques (même SHA-256) : garder un seul exemplaire opérationnel.
- Le ZIP contient des variantes supplémentaires : `Bonjour Bonjour Niani kids.mp3`, `Bonjour Bonjour Niani (Remix).mp3`, ainsi que « Bonjour, bonjour ! — V2/V3 ». Ne pas confondre automatiquement ces variantes avec les deux maquettes du DOCX.
- « Bienvenue chez Niani Kids V2.mp3 » et « À table, bon appétit !.mp3 » ont même durée et taille, mais des empreintes différentes; la durée/taille ne permet pas d’identifier le contenu.
- Avant publication : écoute intégrale, comparaison des paroles, validation native du wolof, droits/licences, puis test de lecture sur Android et sur le site.

## Ordre de travail recommandé
1. Écoute humaine des trois masters en premier.
2. Écoute et comparaison des 25 candidats du ZIP avec les paroles du DOCX.
3. Choix explicite entre les maquettes de bonjour.
4. Transcodage des fichiers retenus en AAC/M4A compatible et normalisation sonore prudente.
5. Intégration en branche de test de l’application; pas de publication sur `main` avant vérification.
6. Création des médias et fiches en brouillon WordPress; publication seulement après validation.