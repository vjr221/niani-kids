# Niani Kids — mémoire de continuité du projet

Dernière mise à jour : 17 octobre 2026 (UTC)

Ce document est le point de reprise du projet. Il distingue l'état vérifié des tâches proposées ou non testées.

## Identité et direction

- Application mobile Expo / React Native / TypeScript : https://github.com/vjr221/niani-kids
- Public : enfants de 0 à 6 ans, avec accompagnement parental.
- Lancement au Sénégal puis extension vers l'Afrique et la diaspora.
- Langues prioritaires : français et wolof. Toute traduction/parole wolof doit être relue par un locuteur compétent avant publication.
- Personnages : Samba (sweat bleu, cheveux courts bouclés), Awa (longues tresses avec perles colorées et tenue d'inspiration sénégalaise), Bobo (casquette rouge à l'envers et tee-shirt jaune) forment le trio principal. Le Baobab est une mascotte-guide/conteur distincte.
- Priorités éditoriales : comptines, berceuses, chansons éducatives, contes et culture sénégalaise.
- Chaînes : YouTube https://youtube.com/@nianikids ; TikTok https://www.tiktok.com/@niani.kids.

## GitHub : état vérifié

- `main` au dernier contrôle : `91224057148aad7362ae51906d3ad7acf9404442`.
- Branche de travail : `feat/niani-kids-modernization-oct-2026`.
- Dernier commit connu : `7a9f6dfd30eb54e0a2b6f0794b8f701afc9aacba`.
- Fichiers ajoutés sur la branche :
  - `docs/MODERNIZATION-ROADMAP-2026.md` — décisions produit et priorités P0–P3.
  - `src/audioCatalog.ts` — garde-fou typé ; catalogue vide tant que les masters ne sont pas validés.
  - `docs/AUDIO-REVIEW-WORKFLOW.md` — méthode d'écoute, transcription, validation des droits/langues.
  - `docs/RELEASE-CHECKLIST.md` — critères de validation avant livraison.
  - `docs/AUDIO-FILE-INVENTORY.md` — durées, tailles, empreintes SHA-256 et doublons exacts.
  - `docs/PROJECT-CONTINUITY.md` — ce document de reprise.
- Une première PR a été tentée via le connecteur GitHub, mais celui-ci a affiché un formulaire interactif. Aucune PR ne doit être considérée créée tant que GitHub ne retourne pas son numéro/URL.
- Le dernier appel de statut de commit pour `bc521222ae77cf6499e88f088b18fc0c48f23b0d` a renvoyé zéro statut ; ce n'est pas une preuve que les tests passent. Le nouveau commit doit être contrôlé séparément.
- Ne pas fusionner automatiquement sur `main` sans revue et contrôles CI.

## État de l'application

- Stack : Expo SDK 54, React Native 0.81.4, React 19.1, TypeScript 5.9 ; scripts `start`, `android`, `ios`, `web`, `typecheck`.
- Écrans existants : Accueil, Bibliothèque, Jouer, Atelier, Parents.
- Fonctionnalités existantes : favoris/langue enregistrés localement, mini-jeux, ateliers parent-enfant, lecture de paroles/contes par synthèse vocale via `expo-speech`, liens vers les réseaux dans l'espace Parents.
- Attention : `expo-speech` lit du texte ; ce n'est pas la lecture de chansons master.
- `src/content.ts` contient 20 fiches environ avec paroles ou contes de démonstration ; les paroles de démonstration ne sont pas toutes associées à un master validé.
- Ne pas annoncer la lecture audio réelle tant que le lecteur n'est pas implémenté, testé et connecté à des masters identifiés.

## Audios ElevenLabs

- Flow : `uiSMmtS8Q8pbnavPtL9o` ; 16 nœuds `eleven_music_v2` marqués terminés et étiquetés :
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
- Statut « terminé » ne signifie pas écouté, validé ou associé à un fichier reçu.
- Dix MP3 reçus ont été vérifiés localement. Ils sont 48 kHz stéréo, 192 kb/s, sans ID3 selon le contrôle précédent. Les durées vont de 75,024 à 81,024 secondes.
- Audit SHA-256 du 17 octobre : 3 groupes de doublons exacts : `content.mp3` = `content (2).mp3`; `content (4).mp3` = `content (5).mp3`; `content (7).mp3` = `content (8).mp3` = `content (9).mp3`. Il y a donc 7 masters binaires distincts au maximum. Voir `docs/AUDIO-FILE-INVENTORY.md` pour les empreintes.
- Titre, langue, paroles, qualité, droits et correspondance des 7 fichiers uniques restent à confirmer. Ne pas les relier aux fiches par ordre de fichier.
- Les images Baobab/village générées via ElevenLabs ne sont pas encore intégrées en fichiers binaires au dépôt.

## Prochaines actions prioritaires

1. Vérifier le SHA courant de la branche et lire le diff réel.
2. Exécuter `npm ci`, `npm run typecheck` et export Android Expo sur la branche ; corriger toute erreur.
3. Identifier les 7 MP3 distincts par écoute/transcription et comparaison avec les nœuds ElevenLabs.
4. Vérifier la compatibilité de `expo-audio` avec Expo SDK 54 avant installation ; intégrer un vrai lecteur avec lecture/pause/progression/fin/erreur/interruption.
5. Tester sur Android physique, petit écran, TalkBack, tailles de texte agrandies, stockage local et navigation.
6. Vérifier politique de confidentialité, parcours des liens externes, Google Play Families, Data safety, IARC et signature EAS.
7. Ouvrir une PR après vérification. Un formulaire affiché n'est pas une PR créée ; une PR ouverte n'est pas fusionnée ; une compilation exportée n'est pas nécessairement un APK signé.

## Références

- Dépôt : https://github.com/vjr221/niani-kids
- Google Play Families : https://support.google.com/googleplay/android-developer/answer/9893335
- Expo Audio : https://docs.expo.dev/versions/latest/sdk/audio/

## Règle de communication

Dire précisément ce qui a été commité, testé, compilé, fusionné ou publié. Si un test n'a pas été exécuté, le signaler. Ne jamais promettre une APK, une PR ou une fusion avant confirmation vérifiable.
