# Contrôle de décodage audio — 27 octobre 2026

## Résultat

Le contrôle FFmpeg a décodé intégralement les **32 fichiers audio** disponibles dans l'espace de travail sans erreur de décodage :
- 29 MP3 contenus dans `Chansons Niani kids.zip` ;
- 3 masters M4A séparés, conservés comme références prioritaires.

Les trois masters ont été transcodés localement en MP3 CBR 160 kbit/s, 44,1 kHz, stéréo pour préparer une intégration compatible :
- `01 Bonjour Bonjour les amis.mp3` — 144,85 s ;
- `02 — Bienvenue chez Niani Kids.mp3` — 60,06 s ;
- `03 - NIANI! NIANI! — ÑU NGI FII!.mp3` — 60,06 s.

## Limites de ce contrôle

Le décodage sans erreur confirme seulement que les flux audio sont techniquement lisibles. Il ne valide pas :
- l'écoute perceptive complète (mixage, clipping, silences, voix et qualité artistique) ;
- la correspondance exacte entre le texte chanté et le DOCX ;
- la prononciation wolof par une personne native ;
- les droits et licences commerciales.

Aucune piste n'est donc marquée comme approuvée et aucune piste ne doit être activée dans l'app ni publiée sur le site sur la seule base de ce test.

## Transfert vers WordPress

Une tentative d'envoi vers le point d'upload temporaire WordPress a échoué depuis l'environnement de travail, car la résolution DNS externe est indisponible (`Could not resolve host: nianikids.com`). Aucun fichier audio n'a été ajouté au serveur WordPress par cette tentative et aucun contenu public n'a été modifié.

## Décision de publication

Maintenir les masters 01, 02 et 03 comme sources de référence. Finaliser l'écoute et les validations éditoriales/droits, puis transférer les fichiers audio vers le serveur WordPress et intégrer les mêmes fichiers dans le build Android avant toute publication.
