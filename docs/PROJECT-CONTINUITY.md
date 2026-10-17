# Niani Kids — mémoire de continuité du projet

Dernière mise à jour : 17 octobre 2026 (UTC)

Ce document est le point de reprise du projet. Il distingue l'état vérifié des tâches proposées ou non testées.

## Identité et direction
- Application mobile Expo / React Native / TypeScript : https://github.com/vjr221/niani-kids
- Public : enfants de 0 à 6 ans, avec accompagnement parental.
- Lancement au Sénégal puis extension vers l'Afrique et la diaspora.
- Langues prioritaires : français et wolof. Toute traduction/parole wolof doit être relue par un locuteur compétent avant publication.
- Personnages : Samba (sweat bleu, cheveux courts bouclés), Awa (longues tresses avec perles colorées et tenue d'inspiration sénégalaise), Bobo (casquette rouge à l'envers et tee-shirt jaune). Le Baobab est une mascotte-guide/conteur distincte.
- Chaînes : https://youtube.com/@nianikids ; https://www.tiktok.com/@niani.kids.

## GitHub : état vérifié
- main au dernier contrôle connu : 91224057148aad7362ae51906d3ad7acf9404442.
- Branche de travail : feat/niani-kids-modernization-oct-2026.
- Dernier commit confirmé au moment de cette mise à jour : `92cd058fc0c49262b9d8124852145092bab2cedf` (`a11y: improve search and game control labels`).
- La branche contient roadmap, src/audioCatalog.ts, workflow de revue audio, inventaire audio actualisé après le dernier envoi (9 fichiers `content*.mp3` dont 7 binaires uniques, plus un fichier WhatsApp distinct), checklist de publication, script de validation du catalogue audio et ce document.
- Le workflow de qualité est configuré pour les pushes sur main et sur la branche de modernisation, les pull requests vers main et le déclenchement manuel.
- CI vérifiée la plus récente : [workflow run 39025566301](https://github.com/vjr221/niani-kids/actions/runs/39025566301), commit `382d5be9bc2d9210c622aea967c827a11caf3682`, conclusion `success` (run #82). Les étapes `npm install`, `npx tsc --noEmit`, `validate-translations`, `validate-content`, `validate-audio-catalog` et `expo export --platform android` sont toutes réussies. Cela valide l'export JS Android, pas une APK installable ni des tests sur appareil.
- La PR #25 « feat: intégrer le Baobab comme guide-conteur » est encore ouverte au dernier contrôle : https://github.com/vjr221/niani-kids/pull/25. Ne pas la déclarer fusionnée sans nouveau contrôle.

## Application
- Expo SDK 54, React Native 0.81.4, React 19.1, TypeScript 5.9.
- Écrans : Accueil, Bibliothèque, Jouer, Atelier, Parents.
- Fonctions existantes : favoris/langue persistés localement, mini-jeux, ateliers parent-enfant, lecture de texte via expo-speech, liens vers réseaux dans l'espace Parents.
- expo-speech est une synthèse vocale, pas un lecteur de chansons enregistrées.
- Un vrai lecteur musical n'est pas encore implémenté ou validé.

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
- `app.json` configure le logo existant comme icône, icône adaptative Android et image de splash ; la CI a réussi sur les commits de documentation/configuration, mais le rendu de l'icône sur un appareil réel reste à contrôler.

## Prochaines actions
1. CI vérifiée verte sur le commit actuel de la branche de modernisation ; garder cette validation comme référence.
2. Identifier les 7 MP3 uniques par écoute/transcription et comparaison aux générations ElevenLabs.
3. Vérifier expo-audio pour SDK 54, puis implémenter et tester lecture/pause/progression/fin/interruption.
4. Intégrer les images comme fichiers d'assets vérifiés.
5. Vérifier accessibilité, confidentialité, sécurité enfant et exigences Google Play Families avant publication.
