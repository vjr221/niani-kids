# Niani Kids — mémoire de continuité du projet

Dernière mise à jour : 17 octobre 2026 (UTC)

Ce document sert de point de reprise pour les prochaines sessions de travail. Il consigne les décisions, liens et état vérifiable du dépôt, sans confondre travail proposé et travail déjà livré.

## Identité et direction

- Application mobile Expo / React Native / TypeScript : https://github.com/vjr221/niani-kids
- Public : enfants de 0 à 6 ans, avec accompagnement parental.
- Lancement Sénégal puis Afrique et diaspora.
- Langues prioritaires : français et wolof. Toute traduction/parole wolof doit être relue par un locuteur compétent avant publication.
- Personnages : Samba (garçon, sweat bleu), Awa (fille, longues tresses et perles), Bobo (garçon, casquette rouge à l'envers et tee-shirt jaune) forment le trio principal. Le Baobab est une mascotte-guide/conteur distincte.
- Priorités éditoriales : comptines, berceuses, chansons éducatives, contes et culture sénégalaise.
- Chaînes : YouTube https://youtube.com/@nianikids ; TikTok https://www.tiktok.com/@niani.kids.

## État du dépôt observé

- Branche principale au dernier contrôle : `main` à `91224057148aad7362ae51906d3ad7acf9404442`.
- Branche de travail créée : `feat/niani-kids-modernization-oct-2026`.
- Commit de cadrage initial : `d8c17948fde12136abb2a314b0be60e41c6655af`.
- Le commit initial a ajouté `docs/MODERNIZATION-ROADMAP-2026.md` : priorités de fiabilité, audio réel, accessibilité, confidentialité, validation linguistique et critères de publication.
- Le 17 octobre, une nouvelle livraison ajoute `src/audioCatalog.ts` (garde-fou typé pour ne pas associer les MP3 par ordre/nom) et ce fichier de continuité. Vérifier le SHA du dernier commit sur GitHub avant de reprendre.
- La création de PR via l'outil GitHub a présenté un formulaire interactif, mais aucune PR n'a été confirmée créée à ce stade. Ne pas affirmer qu'une PR existe avant vérification.
- Ne pas fusionner automatiquement sur `main` sans revue et contrôles de CI.

## État de l'application

- Écrans existants : Accueil, Bibliothèque, Jouer, Atelier, Parents.
- Fonctionnalités existantes : favoris et langue enregistrés localement, mini-jeux, ateliers parent-enfant, lecteur de paroles/contes par synthèse vocale via `expo-speech`, liens vers les réseaux dans l'espace Parents.
- Attention : `expo-speech` lit du texte ; cela ne remplace pas la lecture de chansons master.
- Le dépôt contient des fiches et paroles de démonstration ; elles ne sont pas toutes des masters validés.
- Dix fichiers MP3 transmis dans la conversation ont les noms génériques `/mnt/data/content.mp3` et `/mnt/data/content (1).mp3` à `/mnt/data/content (9).mp3`. Tous sont 48 kHz stéréo, 192 kb/s, sans métadonnées ID3. Durées observées : 75,024 s (la plupart), 81,024 s et 79,032 s pour deux fichiers. Le titre, la langue, les paroles et la correspondance de chaque master ne sont pas encore validés ; ne pas les associer aux titres sur la base de l'ordre.
- Le flow ElevenLabs `uiSMmtS8Q8pbnavPtL9o` contient 16 nœuds `eleven_music_v2` indiqués comme terminés et étiquetés :
  1. Bonjour, bonjour ! — Maquette 01
  2. Bonjour, bonjour ! — Maquette 02
  3. Bienvenue chez Niani Kids
  4. Niani Kids, c’est parti !
  5. Les couleurs dansent
  6. Dors, petit cœur
  7. Les animaux du Sénégal
  8. Comptons jusqu’à 10
  9. Bouge et stop !
  10. Conte musical du Baobab
  11. Nuyoo, nuyoo ! — Bonjour en français et wolof
  12. Les formes
  13. Les jours de la semaine
  14. Les fruits du Sénégal
  15. Je lave mes mains
  16. Quand je ris, quand je pleure
- Statut de nœud terminé ne signifie pas que le master a été écouté, approuvé ou associé à un MP3.
- Les images de Baobab/village produites via ElevenLabs ne sont pas encore intégrées en fichiers binaires au dépôt ; ne pas prétendre le contraire.

## Prochaines actions prioritaires

1. Vérifier le dernier SHA de `feat/niani-kids-modernization-oct-2026` et lire les différences réelles.
2. Exécuter CI/typecheck et corriger toute erreur avant d'ajouter des changements fonctionnels.
3. Identifier les dix MP3 par écoute/transcription avec titre, langue, durée, qualité vocale, rythme, paroles, statut de droits et recommandation d'usage.
4. Relier uniquement les masters approuvés au catalogue et mettre en œuvre le lecteur audio natif compatible avec Expo SDK 54. Vérifier la version de `expo-audio` compatible SDK 54 via la commande d'installation Expo ou sa documentation versionnée ; ne pas installer la version recommandée pour un autre SDK sans vérification.
5. Tester sur un téléphone Android, notamment lecture/pause/fin/interruption, arrière-plan si nécessaire, petits écrans, TalkBack et stockage.
6. Vérifier la politique de confidentialité, le parcours des liens externes, les formulaires Google Play Families/Data safety/IARC, la signature EAS et la version distribuée.
7. Ouvrir une PR après validation. Un formulaire interactif ne constitue pas la création effective d'une PR.

## Références techniques officielles

- Google Play Families : https://support.google.com/googleplay/android-developer/answer/9893335
- Expo Audio : https://docs.expo.dev/versions/latest/sdk/audio/
- Repository : https://github.com/vjr221/niani-kids

## Règle de communication

Dire précisément ce qui a été commité, testé, compilé, fusionné ou publié. Si un test n'a pas été exécuté, le signaler. Ne jamais promettre une APK, une PR ou une fusion avant confirmation vérifiable.
