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
- Dernier commit confirmé : 7418c45f51801aa7db6daec6b57e658bb950420e.
- La branche contient roadmap, src/audioCatalog.ts, workflow de revue audio, inventaire des 10 MP3 (7 fichiers binaires uniques), checklist de publication, script de validation du catalogue audio et ce document.
- Le workflow de qualité est configuré pour les pushes sur main et sur la branche de modernisation, les pull requests vers main et le déclenchement manuel.
- Contrôle après le commit : l'API GitHub n'a renvoyé aucun workflow run ni statut de commit. Cela ne signifie pas que les tests passent ; l'exécution reste non confirmée.
- Aucune PR ni fusion vers main confirmée.

## Application
- Expo SDK 54, React Native 0.81.4, React 19.1, TypeScript 5.9.
- Écrans : Accueil, Bibliothèque, Jouer, Atelier, Parents.
- Fonctions existantes : favoris/langue persistés localement, mini-jeux, ateliers parent-enfant, lecture de texte via expo-speech, liens vers réseaux dans l'espace Parents.
- expo-speech est une synthèse vocale, pas un lecteur de chansons enregistrées.
- Un vrai lecteur musical n'est pas encore implémenté ou validé.

## Audios ElevenLabs
- Flow musical : uiSMmtS8Q8pbnavPtL9o. L'inspection la plus récente révèle 19 nœuds, dont 16 titres précédemment identifiés comme terminés, deux nœuds terminés aux titres génériques et un nœud en échec. Aucun lien entre nœuds.
- Nœuds supplémentaires visibles : Ma famille, ma force (terminé), Je brosse mes dents (un nœud en échec et un autre terminé). Vérifier leurs résultats et renommer les nœuds génériques dans ElevenLabs avant usage.
- Dix MP3 reçus : 48 kHz stéréo, 192 kb/s, sans ID3 selon le contrôle précédent ; durées entre 75,024 et 81,024 secondes.
- Doublons binaires exacts : content.mp3 = content (2).mp3; content (4).mp3 = content (5).mp3; content (7).mp3 = content (8).mp3 = content (9).mp3. Il reste 7 fichiers binaires uniques au maximum.
- Titres, paroles, langues, droits et correspondances restent à confirmer. Ne pas associer les fichiers par ordre.
- Fond de village généré en 1280×720 : HzH2gWVNXC76I1dtDSgP. Il n'est pas encore intégré au dépôt.

## Changements techniques de cette séquence
- scripts/validate-audio-catalog.mjs vérifie les références de contenu, l'unicité des identifiants et les champs requis pour les contrôles de langue, droits et approbation.
- .github/workflows/quality.yml exécute ce script en plus de TypeScript, des validations de contenu/traductions et de l'export Android Expo ; le workflow inclut la branche de modernisation.
- Le script a été relu depuis GitHub après correction des motifs d'expression régulière. Toutefois, son exécution effective, le typecheck et l'export Expo ne sont pas confirmés, faute de résultat CI.
- Le catalogue audio reste volontairement vide jusqu'à validation des masters.

## Prochaines actions
1. Obtenir un résultat effectif du workflow GitHub et corriger les éventuels échecs.
2. Identifier les 7 MP3 uniques par écoute/transcription et comparaison aux générations ElevenLabs.
3. Vérifier expo-audio pour SDK 54, puis implémenter et tester lecture/pause/progression/fin/interruption.
4. Intégrer les images comme fichiers d'assets vérifiés.
5. Vérifier accessibilité, confidentialité, sécurité enfant et exigences Google Play Families avant publication.
