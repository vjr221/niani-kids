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
- Chaînes : https://youtube.com/@nianikids ; https://www.tiktok.com/@niani.kids.

## GitHub : état vérifié

- main au dernier contrôle connu : 91224057148aad7362ae51906d3ad7acf9404442.
- Branche de travail : feat/niani-kids-modernization-oct-2026.
- Dernier commit connu avant cette mise à jour : f33cf98773a20f17c7a3937831f6fa872c6252ca.
- Fichiers de travail : roadmap, src/audioCatalog.ts, workflow de revue audio, inventaire des 10 fichiers reçus (7 binaires uniques), checklist de publication et ce document.
- Cette branche est distincte de main. Ne pas annoncer de fusion ni de PR tant que GitHub n'en confirme pas le numéro et le statut.
- Aucun workflow CI n'a été trouvé pour la branche lors du dernier contrôle. Cela ne prouve ni réussite ni échec des tests.

## État de l'application

- Stack : Expo SDK 54, React Native 0.81.4, React 19.1, TypeScript 5.9.
- Écrans existants : Accueil, Bibliothèque, Jouer, Atelier, Parents.
- Fonctionnalités existantes : favoris/langue enregistrés localement, mini-jeux, ateliers parent-enfant, lecture de paroles/contes par synthèse vocale via expo-speech, liens réseaux dans l'espace Parents.
- expo-speech lit du texte ; ce n'est pas un lecteur de chanson master.
- src/content.ts contient des fiches et paroles de démonstration. Ne pas les présenter comme des masters enregistrés.
- Le vrai lecteur musical n'est pas encore implémenté ou validé.

## Audios ElevenLabs

- Flow musique : uiSMmtS8Q8pbnavPtL9o, avec 16 nœuds musicaux étiquetés. Un état completed ne prouve pas une écoute, une validation éditoriale ou un lien avec un MP3.
- Dix MP3 reçus : 48 kHz stéréo, 192 kb/s, sans ID3 selon le contrôle précédent ; durées entre 75,024 et 81,024 secondes.
- Doublons binaires exacts : content.mp3 = content (2).mp3 ; content (4).mp3 = content (5).mp3 ; content (7).mp3 = content (8).mp3 = content (9).mp3. Il reste 7 fichiers uniques au maximum.
- Titres, paroles, langues, droits et correspondances restent à confirmer. Ne pas associer les fichiers par ordre.
- Images Baobab et village générées via ElevenLabs, mais pas encore intégrées comme fichiers binaires au dépôt.
- Fond de village terminé en 1280×720 : génération HzH2gWVNXC76I1dtDSgP. Historique : https://elevenlabs.io/app/image-video/history?modality=image&generationId=HzH2gWVNXC76I1dtDSgP.

## Changement ajouté dans cette étape

- Ajout de scripts/validate-audio-catalog.mjs pour contrôler les identifiants audio, les contentId dupliqués, la correspondance avec le catalogue et les conditions d'approbation.
- Ajout de cette validation au workflow .github/workflows/quality.yml.
- Ces changements ne sont pas déclarés testés tant que le workflow n'a pas été exécuté et que son résultat n'est pas observable.

## Prochaines actions prioritaires

1. Vérifier le SHA de la branche et l'état des workflows après ce commit.
2. Faire passer TypeScript, validation des traductions/contenus/audio et export Android Expo.
3. Identifier les 7 MP3 uniques par écoute/transcription et comparaison aux générations ElevenLabs.
4. Vérifier la compatibilité expo-audio avec Expo SDK 54 ; implémenter puis tester lecture/pause/progression/fin/interruption.
5. Intégrer les illustrations en fichiers d'assets vérifiés, puis tester l'interface sur Android.
6. Vérifier l'accessibilité, la confidentialité et les exigences Google Play Families avant publication.
