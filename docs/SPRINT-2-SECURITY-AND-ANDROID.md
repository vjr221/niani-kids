# Niani Kids — Sprint 2 : sécurité et livraison Android

Date : 22 octobre 2026  
Branche : `audit/sprint-2-dependency-remediation`

## Résultats vérifiés

- Le contrôle qualité de `main` passe : installation verrouillée, contrôle Expo, TypeScript, validateurs de traductions/contenu/audio et export Android.
- Le workflow Android a généré un APK d'environ 36 MB et `apksigner` a confirmé que sa signature cryptographique est valide.
- **Limite importante : le certificat observé est le certificat de débogage Android** (`CN=Android Debug`, empreinte SHA-256 du certificat `fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c`). Ce build est donc un APK de prévisualisation/test, **pas un artefact signé pour la publication Google Play**. La vérification de signature prouve l'intégrité/signature du fichier, pas l'identité de l'éditeur ni son aptitude à la publication.
- Le build EAS séparé n'a pas démarré car le quota gratuit Android du compte est épuisé; ce n'est pas une erreur de compilation.
- L'audit npm a signalé 28 avis (23 élevés, 5 modérés, aucun critique). `npm audit fix` sans `--force` a terminé, mais le rapport après correction indique toujours 28 avis. Les changements temporaires du lockfile ont donc été écartés; ils ne sont pas présentés comme une résolution de sécurité.
- Les correctifs proposés automatiquement par npm impliquent notamment des changements majeurs d'Expo / React Native qui ne doivent pas être appliqués sans une migration SDK dédiée et des tests de compatibilité.

## Changement proposé dans cette branche

Ajout d'une étape `apksigner verify --verbose --print-certs` au workflow Android, avant l'upload de l'APK. Elle valide la signature et affiche le certificat utilisé. Le workflow nomme désormais l'artefact comme une prévisualisation afin de ne pas le confondre avec un APK de production.

## Conditions avant publication

1. Configurer une clé de signature de production contrôlée par l'éditeur (ou EAS Build avec les identifiants de signature gérés de façon sûre); ne jamais committer le keystore ni ses mots de passe.
2. Ajouter un contrôle CI qui vérifie l'empreinte attendue du certificat de production une fois cette empreinte confirmée. Ne pas accepter le certificat Android Debug comme preuve de signature de production.
3. Tester l'installation et la mise à jour sur des appareils Android réels.
4. Planifier une mise à niveau contrôlée des dépendances Expo SDK 54 / React Native, par petits lots, en surveillant les avis npm et en exécutant les tests après chaque lot.
5. Finaliser la politique de confidentialité et le contact officiel de l'éditeur. Ne pas inventer de coordonnées ni publier une politique définitive avant confirmation.
6. Vérifier Google Play Families, Data safety, classification d'âge, liens externes et expérience réelle sur appareils Android avant toute publication.

## Liens CI

- Contrôle qualité sur `main`: https://github.com/vjr221/niani-kids/actions/runs/39736653592
- Build APK sur `main`: https://github.com/vjr221/niani-kids/actions/runs/39736653687
- Build preview avec vérification de signature : https://github.com/vjr221/niani-kids/actions/runs/39738936093
- Tentative d'audit de dépendances (échec de push car la branche a avancé; aucun changement d'audit non validé n'a été intégré): https://github.com/vjr221/niani-kids/actions/runs/39738936052
