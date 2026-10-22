# Niani Kids — Sprint 2 : sécurité et livraison Android

Date : 22 octobre 2026  
Branche : `audit/sprint-2-dependency-remediation`

## Résultats vérifiés

- Le contrôle qualité de `main` passe : installation verrouillée, contrôle Expo, TypeScript, validateurs de traductions/contenu/audio et export Android.
- Le workflow Android de `main` a produit un APK release d'environ 36 MB. Le fichier est disponible comme artefact GitHub pour le commit `a15d42bce8af485188f520b8014bd0127e168a8d`.
- Le build EAS séparé n'a pas démarré car le quota gratuit Android du compte est épuisé; ce n'est pas une erreur de compilation.
- L'audit npm a signalé 28 avis (23 élevés, 5 modérés, aucun critique). `npm audit fix` sans `--force` a terminé, mais le rapport après correction indique toujours 28 avis. Les changements temporaires du lockfile ont donc été écartés; ils ne sont pas présentés comme une résolution de sécurité.
- Les correctifs proposés automatiquement par npm impliquent notamment des changements majeurs d'Expo / React Native qui ne doivent pas être appliqués sans une migration SDK dédiée et des tests de compatibilité.

## Changement proposé dans cette branche

Ajout d'une étape `apksigner verify --verbose --print-certs` au workflow Android, avant l'upload de l'APK. Cela permet de vérifier cryptographiquement la signature du fichier généré dans le CI. La vérification ne remplace pas un test d'installation sur appareil physique.

## Suite priorisée

1. Vérifier le résultat du workflow Android incluant `apksigner`.
2. Planifier une mise à niveau contrôlée des dépendances Expo SDK 54 / React Native, par petits lots, en surveillant les avis npm et en exécutant les tests après chaque lot.
3. Finaliser la politique de confidentialité et le contact officiel de l'éditeur. Ne pas inventer de coordonnées ni publier une politique définitive avant confirmation.
4. Vérifier Google Play Families, Data safety, classification d'âge, liens externes et expérience réelle sur appareils Android avant toute publication.

## Liens CI

- Contrôle qualité sur `main`: https://github.com/vjr221/niani-kids/actions/runs/39736653592
- Build APK sur `main`: https://github.com/vjr221/niani-kids/actions/runs/39736653687
- Tentative d'audit de dépendances (résultat non concluant): https://github.com/vjr221/niani-kids/actions/runs/39737014796
