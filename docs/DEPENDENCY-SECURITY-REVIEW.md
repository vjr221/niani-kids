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


## Triage ciblée — 23 octobre 2026 (recherche d'avis publics)

Cette recherche complète le rapport npm archivé; elle ne remplace pas la vérification des chemins exacts dans le lockfile ni les tests d'intégration.

- **PostCSS 8.4.49** : des avis publics récents couvrent des versions bien plus récentes que 8.4.49; le correctif pour l'avis élevé de traversée de chemin est indiqué à partir de 8.5.18, et un avis de correction incomplète indique 8.5.23. Une mise à jour dans la ligne 8.x semble à étudier en premier, mais elle doit être testée avec les dépendances Expo/Metro qui la consomment. Références : [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849), [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp).
- **node-forge 1.4.0** : l'avis [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv) couvre également la version 1.4.0 et ne déclare pas de version corrigée. Ne pas prétendre que la mise à jour vers 1.4.0 a résolu tous les avis node-forge; identifier le consommateur et l'exposition, puis suivre la correction amont.
- **braces 3.0.3 / micromatch 4.0.8** : l'avis [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) couvre braces jusqu'à 3.0.3 et la recherche n'a pas identifié de version amont corrigée sur cette ligne. Éviter un override arbitraire vers une fourche non vérifiée; suivre l'amont et documenter l'exposition du chemin de dépendance.
- **image-size 1.2.1** : un avis antérieur est corrigé en 1.2.1, mais des avis plus récents concernent les versions 1.x/2.0.x et signalent l'absence de version corrigée dans les métadonnées amont consultées. Ne pas supposer que la correction d'un avis règle tous les avis du paquet. Vérifier les avis précis du JSON npm et les contraintes de Metro avant toute substitution.
- **Compatibilité Expo** : la documentation Expo associe SDK 54 à React Native 0.81; garder ce couple aligné pendant le tri. Une migration SDK est un chantier séparé, pas un correctif automatique d'audit.

### Décision de remédiation

1. Prioriser l'analyse et le test contrôlé de PostCSS, car une version corrective est identifiée dans la ligne 8.x.
2. Traiter node-forge, braces et image-size comme des cas nécessitant une analyse de la chaîne et/ou une correction amont; ne pas ajouter d'override non validé.
3. Pour chaque changement, comparer `npm audit --json` avant/après, puis exécuter `npm ci`, `npx expo install --check`, TypeScript, les validateurs du projet et l'export Android.
4. Garder la PR ouverte et en brouillon jusqu'à ce que les corrections aient été vérifiées et que les tests natifs restants soient effectués.


## Mise à jour CI et contrainte PostCSS — 23 octobre 2026

- Le contrôle qualité a terminé avec succès sur le commit `daa0d064d85fe534b033bdd7f379a45e78d43b95` : [workflow CI](https://github.com/vjr221/niani-kids/actions/runs/39879608121). L'installation verrouillée, le rapport d'audit, la vérification Expo, TypeScript, les validateurs et l'export Android ont réussi. Cette réussite valide la documentation et l'état actuel des dépendances; elle ne signifie pas que les vulnérabilités ont été corrigées.
- Le lockfile indique que `@expo/metro-config 54.0.17` dépend de `postcss ~8.4.32`, ce qui bloque une résolution normale vers PostCSS 8.5.x. L'issue Expo [#45620](https://github.com/expo/expo/issues/45620) documente cette contrainte sur des versions plus récentes et le changement amont vers une plage 8.5.x dans la ligne SDK 55. Il faut donc éviter de présenter un override 8.5.x comme une mise à jour officiellement alignée sur SDK 54.
- PostCSS 8.5.23 corrige l'avis d'incomplétude de correctif publié le 24 juillet 2026 ([GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp)); les avis de juillet doivent être évalués séparément et le rapport JSON doit être réexécuté après toute modification. Les mainteneurs Expo ont indiqué que l'avis antérieur sur XSS dans la sérialisation ne concernait pas leur usage de PostCSS, mais cette remarque ne permet pas de conclure que les avis ultérieurs de lecture de fichiers source-map sont sans pertinence.
- **Décision actuelle :** aucune modification de version ni override PostCSS n'est appliqué dans cette mise à jour. Le prochain essai doit être isolé, accompagné d'un lockfile généré par npm, d'une comparaison des rapports avant/après, puis de l'ensemble des tests CI. Si l'override est testé, il doit être clairement documenté comme contournement temporaire, avec un plan de retrait lorsque la ligne Expo/Metro fournit une plage compatible.
