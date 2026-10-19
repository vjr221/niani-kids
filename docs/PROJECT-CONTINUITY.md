# Niani Kids — mémoire de continuité du projet

Dernière mise à jour : 19 octobre 2026 (UTC)

Ce document est le point de reprise du projet. Il distingue l'état vérifié des tâches proposées ou non testées.

## Identité et direction
- Application mobile Expo / React Native / TypeScript : https://github.com/vjr221/niani-kids
- Public : enfants de 0 à 6 ans, avec accompagnement parental.
- Lancement au Sénégal puis extension vers l'Afrique et la diaspora.
- Langues prioritaires : français et wolof. Toute traduction/parole wolof doit être relue par un locuteur compétent avant publication.
- Personnages : Samba (sweat bleu, cheveux courts bouclés), Awa (longues tresses avec perles colorées et tenue d'inspiration sénégalaise), Bobo (casquette rouge à l'envers et tee-shirt jaune). Le Baobab est une mascotte-guide/conteur distincte.
- Chaînes : https://youtube.com/@nianikids ; https://www.tiktok.com/@niani.kids.

## GitHub : état vérifié
- main au dernier contrôle : `1c902724823e7387a858fb0e36cd278267edecdd` (merge de la PR #26). La branche de modernisation est 50 commits en avance et 3 en retard par rapport à ce SHA lors de la comparaison du 19 octobre ; synchroniser et résoudre les éventuels conflits avant d'ouvrir/mettre à jour une PR vers main.
- Branche de travail : feat/niani-kids-modernization-oct-2026.
- Dernier commit confirmé au moment de cette mise à jour : `1db333fd362033f966a7af4e1cfcb1c8bcb0cbe7` (`docs: record dependency audit findings and safe remediation plan`).
- La branche contient roadmap, src/audioCatalog.ts, workflow de revue audio, inventaire audio actualisé après le dernier envoi (9 fichiers `content*.mp3` dont 7 binaires uniques, plus un fichier WhatsApp distinct), checklist de publication, script de validation du catalogue audio et ce document.
- Le workflow de qualité est configuré pour les pushes sur main et sur la branche de modernisation, les pull requests vers main et le déclenchement manuel. Il exécute aussi `npx expo install --check` pour détecter les versions incompatibles avec le SDK.
- CI vérifiée la plus récente : run [#126](https://github.com/vjr221/niani-kids/actions/runs/39259244005), commit `8a709cd6cce5bb0f475725270fb85d4fa0adeb45`, conclusion `success`. Les runs [#125](https://github.com/vjr221/niani-kids/actions/runs/39259209808) et [#124](https://github.com/vjr221/niani-kids/actions/runs/39258895557) sont aussi verts. Tous les contrôles passent, y compris `npx expo install --check`, TypeScript, parité des 172 clés FR/Wolof, validation des 22 contenus, catalogue audio (0 master activé) et export Android Expo. Le run #123 a produit le rapport npm : 35 avis (12 modérés, 23 élevés, 0 critique), également 35 avec `npm audit --omit=dev`. L'export Expo valide le bundle JS Android, pas une APK installable ni des tests sur appareil.
- La PR #25 « feat: intégrer le Baobab comme guide-conteur » a été vérifiée via l’API GitHub : état `closed`, `merged=true`, fusionnée le 17 octobre 2026 dans `main` avec le commit `ed625d6a57820e663c392d04969e621220d174f5`. Référence : https://github.com/vjr221/niani-kids/pull/25.

## Sécurité des dépendances — contrôle du 19 octobre 2026
- Suivi créé : [issue #28 — réduire les avis npm et verrouiller les versions](https://github.com/vjr221/niani-kids/issues/28).
- CI #123 : [rapport de dépendances](https://github.com/vjr221/niani-kids/actions/runs/39258652262) — le rapport npm compte 35 vulnérabilités (12 modérées, 23 élevées, aucune critique) dans l'arbre installé. Le même total apparaît avec `npm audit --omit=dev`, donc ce n'est pas limité aux dépendances de développement.
- Plusieurs corrections suggérées par npm impliquent une mise à niveau majeure (par exemple React Native vers 0.86.x ou des changements majeurs du SDK Expo). Ne pas appliquer `npm audit fix --force` sans plan de migration et validation native.
- Le workflow affiche désormais les rapports complet et production sans bloquer les contrôles fonctionnels. Prochaine étape sécurité : analyser les avis individuels et distinguer les chemins réellement embarqués dans l'application avant de choisir des mises à niveau compatibles SDK 54.

## Application
- Expo SDK 54, React Native 0.81.5, React 19.1, TypeScript 5.9.
- Écrans : Accueil, Bibliothèque, Jouer, Atelier, Parents.
- Fonctions existantes : favoris/langue persistés localement, mini-jeux, ateliers parent-enfant, lecture de texte via expo-speech, liens vers réseaux dans l'espace Parents.
- expo-speech est une synthèse vocale, pas un lecteur de chansons enregistrées.
- `src/AudioPlayerCard.tsx` implémente une interface de lecture avec play/pause, progression, temps écoulé/durée, sauts ±10 secondes et libellés accessibles en français et en wolof selon la langue sélectionnée. Les commandes de saut sont désactivées pendant le chargement. Le lecteur est connecté au catalogue via `isAudioReady` et ne s'affiche que pour un master approuvé. CI verte, mais aucun master n'est approuvé et la lecture native n'a pas été testée sur appareil.

## Audios ElevenLabs
- Flow musical : uiSMmtS8Q8pbnavPtL9o. La vérification la plus récente renvoie 18 nœuds, 17 terminés et un en échec. Aucun lien entre nœuds. Le nombre précédent de 19 était une erreur de comptage ; utiliser le registre docs/AUDIO-TRACK-REGISTER.md comme référence.
- Inspection des prompts des nœuds supplémentaires : `TPPsTRB9e8TmLEjssDme` = « Ma famille, mes amis » (terminé) ; `577nL1TrUo19ggB3hOWf` = « Je brosse mes petites dents » (terminé) ; `okyVoqnA0AvO4K7VdOJY` = autre variante de « Je brosse mes petites dents » (échec). Les trois labels ont été renommés dans ElevenLabs pour distinguer les deux générations terminées et la version en échec. Aucune génération payante supplémentaire n'a été lancée.
- Dix MP3 reçus : 48 kHz stéréo, 192 kb/s, sans ID3 selon le contrôle précédent ; durées entre 75,024 et 81,024 secondes.
- Doublons binaires exacts : content.mp3 = content (2).mp3; content (4).mp3 = content (5).mp3; content (7).mp3 = content (8).mp3 = content (9).mp3. Il reste 7 fichiers binaires uniques au maximum.
- Titres, paroles, langues, droits et correspondances restent à confirmer. Ne pas associer les fichiers par ordre.
- Fond de village généré en 1280×720 : HzH2gWVNXC76I1dtDSgP. Il n'est pas encore intégré au dépôt.

## Changements techniques de cette séquence
- scripts/validate-audio-catalog.mjs vérifie les références de contenu, l'unicité des identifiants et les champs requis pour les contrôles de langue, droits et approbation.
- .github/workflows/quality.yml exécute ce script en plus de TypeScript, des validations de contenu/traductions et de l'export Android Expo ; le workflow inclut la branche de modernisation.
- Le script a été relu depuis GitHub après correction des motifs d'expression régulière. Le workflow CI a depuis terminé avec succès sur le commit 7418c45f51801aa7db6daec6b57e658bb950420e, y compris le typecheck et l'export Expo Android.
- Le catalogue audio reste volontairement vide jusqu'à validation des masters.
- La configuration audio doit être contrôlée par la CI et un build natif avant livraison ; l’export JS seul ne prouve pas le rendu audio sur appareil.
- `app.json` configure le logo existant comme icône, icône adaptative Android et image de splash ; la CI a réussi sur les commits de documentation/configuration, mais le rendu de l'icône sur un appareil réel reste à contrôler.

## Prochaines actions
1. CI verte sur le SHA `1db333fd362033f966a7af4e1cfcb1c8bcb0cbe7` (run #124). Le contrôle Expo et l'export Android passent ; le rapport de sécurité reste un point de suivi prioritaire.
2. Identifier les 7 MP3 uniques par écoute/transcription et comparaison aux générations ElevenLabs.
3. Vérifier expo-audio pour SDK 54, puis implémenter et tester lecture/pause/progression/fin/interruption.
4. Intégrer les images comme fichiers d'assets vérifiés.
5. Vérifier accessibilité, confidentialité, sécurité enfant et exigences Google Play Families avant publication.


## Contrôles CI supplémentaires — 19 octobre 2026

- Runs #115 et #116 terminés avec succès après localisation du lecteur audio et connexion à la langue active.
- Le workflow de qualité exécute `npx expo install --check` après `npm install`; résultat confirmé vert au run #124. Le dépôt ne contient pas de `package-lock.json` : l'installation CI n'est donc pas verrouillée par un lockfile et devrait être rendue reproductible avant publication.
- Un build EAS Android a réussi sur `main` au SHA `1c902724823e7387a858fb0e36cd278267edecdd` : [build Expo](https://expo.dev/accounts/vjr221s-team/projects/niani-kids/builds/937e1f9a-79e0-4c09-85a5-0b50586ea521). Ce build précède les changements de la branche de modernisation et ne valide donc pas le code actuel. Aucun nouveau build EAS payant ni publication n'a été lancé. Le profil APK `preview` est configuré dans `eas.json`, mais un build natif et un essai sur appareil restent à effectuer avant de déclarer la lecture native validée.
