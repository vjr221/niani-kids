# Niani Kids — revue de sécurité des dépendances

Dernière vérification : 19 octobre 2026 (UTC)

## Résultat observé

- Source : rapport automatisé npm du workflow [CI #123](https://github.com/vjr221/niani-kids/actions/runs/39258652262), branche `feat/niani-kids-modernization-oct-2026`.
- `npm audit` : **35 avis** — 12 modérés, 23 élevés, 0 critique.
- `npm audit --omit=dev` : même total de 35 (12 modérés, 23 élevés, 0 critique).
- Le contrôle Expo `npx expo install --check` et l'export Android réussissent dans la [CI #124](https://github.com/vjr221/niani-kids/actions/runs/39258895557).
- Dépendances directes confirmées : Expo SDK 54, React 19.1, React Native 0.81.5, expo-audio ~1.1.1, expo-asset ~12.0.13.
- Le dépôt ne contient pas de `package-lock.json`. Les résolutions transitives peuvent donc changer entre deux exécutions de `npm install`; il faut corriger cela avant une livraison stable.

## Ce que le rapport permet de conclure

Les avis couvrent en grande partie la chaîne Expo/Metro et des dépendances transitives, avec des paquets tels que `@expo/cli`, `@expo/metro`, `metro-config`, `metro-file-map`, `micromatch`, `node-forge`, `postcss`, `uuid` et des paquets Jest. Le rapport npm marque aussi `react-native` comme dépendance directe vulnérable selon les avis et plages qu'il a résolus.

Le fait que `npm audit --omit=dev` conserve le même total ne prouve pas que 35 vulnérabilités sont toutes exploitables par un utilisateur de l'application : l'application déclare plusieurs outils de l'écosystème Expo comme dépendances normales, et npm agrège les avis par paquet. Chaque avis doit être examiné avec sa chaîne de dépendances, la version réellement résolue et le contexte d'utilisation.

Le rapport npm a proposé des corrections qui impliquent des changements majeurs, notamment React Native 0.86.x ou des versions Expo incompatibles avec le SDK déclaré. **Ne pas exécuter `npm audit fix --force`** : cela pourrait casser l'alignement Expo, le build natif ou les modules natifs.

## Plan de remédiation sûr

1. Ajouter un `package-lock.json` généré et vérifié avec npm, puis passer le workflow à `npm ci` une fois le lockfile commité.
2. Exporter et conserver le rapport complet `npm audit --json` comme artefact ou fichier de revue, afin de suivre les avis et les versions résolues entre les exécutions.
3. Examiner d'abord les avis élevés liés à `node-forge`, `postcss`, Metro et React Native, en identifiant pour chacun la chaîne de dépendances et les versions corrigées compatibles avec Expo SDK 54.
4. Appliquer seulement des mises à jour compatibles, par petits lots, et exiger `npx expo install --check`, TypeScript, validateurs de contenu/traductions/catalogue et export Android vert à chaque lot.
5. Après les mises à jour, réaliser un build natif Android de préproduction et un test sur appareil avant toute diffusion. Le build cloud n'est pas lancé automatiquement dans le cadre de cette revue.

## Statut de livraison

- [x] CI fonctionnelle et export JS Android vert.
- [x] Contrôle de compatibilité Expo vert.
- [x] Vulnérabilités détectées et consignées.
- [ ] Lockfile reproductible ajouté et CI migrée vers `npm ci`.
- [ ] Avis élevés triés et corrections compatibles appliquées.
- [ ] Build natif Android et test réel sur appareil.
- [ ] Revue finale de confidentialité, sécurité enfant et conformité au programme Google Play Familles.

Ce document décrit l'état du rapport observé, pas une certification de sécurité.

## Mise à jour — 22 octobre 2026 (UTC)

Cette section complète le relevé historique du 19 octobre ci-dessus; elle ne remplace pas ses résultats datés.

- La vérification plus récente effectuée dans le cadre de la PR [#46](https://github.com/vjr221/niani-kids/pull/46) rapporte **28 avis npm : 23 élevés, 5 modérés et 0 critique**. Ce total n'est pas directement comparable à l'ancien total sans comparer les versions effectivement résolues et les rapports détaillés.
- L'exécution de `npm audit fix` sans `--force` s'est terminée, mais n'a pas réduit le nombre total d'avis. Les changements temporaires du lockfile n'ont pas été intégrés.
- Le lockfile et le durcissement de l'installation CI ont depuis été ajoutés dans la branche principale via le sprint 1; la PR #46 part de cette base. Vérifier que toute future modification des dépendances garde `package-lock.json` cohérent avec `package.json` et que la CI utilise l'installation verrouillée.
- Aucune mise à jour majeure proposée automatiquement n'a été appliquée. Ne pas utiliser `npm audit fix --force` sans plan de migration Expo/React Native et tests natifs.
- Les rapports détaillés doivent encore être examinés avis par avis : le nombre agrégé ne démontre ni l'exploitabilité de chaque avis dans l'application ni l'absence de risque.

## État actualisé du plan

- [x] Lockfile reproductible ajouté et installation CI durcie.
- [ ] Archiver un rapport complet `npm audit --json` daté pour la revue actuelle.
- [ ] Trier les avis élevés par paquet, chaîne de dépendance, exposition et version corrective compatible avec Expo SDK 54.
- [ ] Appliquer les corrections compatibles par petits lots, puis exécuter les contrôles Expo, TypeScript, validateurs et export Android.
- [ ] Réaliser un build de préproduction et des tests sur appareil avant diffusion.

Le statut de sécurité reste **en cours de revue**; ce document ne constitue pas une certification.


## Mise à jour — 23 octobre 2026 (rapport CI archivé)

Le workflow de la PR #46 a maintenant terminé avec succès sur le commit `b2aaebe78065f7e3c6a7512eeb912650b863f4c7`. Les contrôles Expo, TypeScript, validateurs et export Android sont verts. Le rapport complet est archivé dans l'artefact CI [niani-kids-npm-audit](https://github.com/vjr221/niani-kids/actions/runs/39879138759), disponible jusqu'au 6 novembre 2026.

- Le rapport de cette exécution contient **23 avis de sévérité élevée, 0 modéré, 0 critique**. L'audit avec `--omit=dev` renvoie le même total. Cela ne veut pas dire que les 23 problèmes sont tous exploitables dans le binaire; les versions et chaînes de dépendances doivent être évaluées.
- Ce résultat diffère du décompte précédent de 28 (23 élevés + 5 modérés). Il faut conserver les dates et rapports séparés plutôt que mélanger les chiffres; la différence de résolution du graphe ou de la base d'avis doit être clarifiée lors du tri.
- Versions présentes dans le lockfile pour des paquets signalés : `expo 54.0.38`, `react-native 0.81.5`, `node-forge 1.4.0`, `postcss 8.4.49`, `image-size 1.2.1`, `braces 3.0.3`, `micromatch 4.0.8`, Metro `0.83.3`. La chaîne Metro/Expo et les outils Jest sont transitifs de l'écosystème React Native.
- Le rapport npm propose souvent une correction majeure globale (Expo 44 ou React Native 0.86.3), ce qui n'est pas une recommandation acceptable pour ce projet Expo SDK 54 sans migration. Ne pas appliquer ces propositions globales automatiquement.
- Des paquets isolés comme `image-size` et `metro-transform-worker` indiquent une correction disponible; ils seront étudiés avec leurs contraintes amont. Pour `postcss`, `node-forge`, `braces` et Metro, vérifier les versions corrigées et les plages imposées par Expo avant de créer un override. Aucun override ou correctif de dépendance n'est appliqué dans cette mise à jour documentaire.

## Étapes suivantes

1. Confirmer, à partir des avis complets et de leurs URL, les versions corrigées de chaque paquet.
2. Tester les correctifs transitifs isolés dans une branche de remédiation et laisser la CI vérifier l'installation, l'export Expo et TypeScript.
3. Ne pas publier tant que les avis élevés ne sont pas triés, les tests Android réels exécutés et la signature de production configurée.
