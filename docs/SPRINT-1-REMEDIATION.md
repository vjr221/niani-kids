# Niani Kids — Sprint 1 : fiabilisation de la livraison

Branche de travail : `audit/sprint-1-release-hardening`  
Base auditée : `a0e636b93f3376a56ec70575bee32cc917c717eb`  
Date : 22 octobre 2026

## Corrections effectuées sur cette branche

- [x] Génération du `package-lock.json` avec npm/Node sur GitHub Actions à partir du `package.json` réel.
- [x] Validation de la nouvelle résolution avec `npm ci`.
- [x] Contrôle `npx expo install --check`.
- [x] Contrôle TypeScript.
- [x] Validation du catalogue de traductions, du contenu et du catalogue audio.
- [x] Export Android Expo.
- [ ] Migrer les workflows de qualité et d'APK vers `npm ci` (en cours dans cette branche).
- [ ] Recalculer et examiner les avis `npm audit` sur le lockfile actuel.
- [ ] Vérifier la signature effective de l'APK et effectuer une installation sur un appareil Android physique.
- [ ] Finaliser la politique de confidentialité publique et les coordonnées officielles de l'éditeur.
- [ ] Vérifier les déclarations Google Play Families, Data safety et la classification d'âge avant publication.

## Résultat du bootstrap du lockfile

Le workflow de bootstrap a terminé avec succès. Le lockfile a été créé, puis les étapes `npm ci`, compatibilité Expo, TypeScript, les trois validateurs et l'export Android ont toutes réussi avant le commit automatique du lockfile.

Exécution : https://github.com/vjr221/niani-kids/actions/runs/39736006399

## Politique de sécurité

Ne pas exécuter `npm audit fix --force`. Toute mise à jour de dépendance doit être compatible avec Expo SDK 54 et être vérifiée avec l'installation verrouillée, les contrôles de code et l'export Android. Le rapport d'audit doit distinguer les dépendances transitives, les avis réellement applicables et les corrections disponibles.

## Décision de publication

Un build vert ne certifie pas la conformité à Google Play Families, l'accessibilité sur appareils réels, la signature de distribution ni l'exactitude éditoriale des contenus. La publication reste bloquée tant que les cases ci-dessus ne sont pas validées.
