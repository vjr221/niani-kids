# Niani Kids — modernisation et sécurité

## Contrôle parental des liens externes

Les liens vers YouTube, TikTok, Facebook et Instagram passent par un contrôle arithmétique aléatoire puis une confirmation explicite avant de quitter l'application. Ce mécanisme réduit les sorties accidentelles de l'espace enfant ; il ne constitue pas une vérification d'identité et ne remplace pas les exigences Google Play Families.

## Données et stockage

Les favoris et récompenses restent sur l'appareil via AsyncStorage. Ne pas ajouter d'analytics, de publicité, de compte enfant, de géolocalisation ni de collecte distante sans décision produit explicite et revue de conformité. AsyncStorage est asynchrone et convient aux petits volumes non sensibles ; MMKV n'est pas requis tant que le gain de performance n'est pas mesuré. Ne jamais stocker de secrets ou de données sensibles côté client.

## Audio

L'application utilise Expo Audio. Les sources audio doivent rester dans le catalogue uniquement après vérification des droits, validation éditoriale et intégration des masters finaux. La lecture en arrière-plan doit être activée et testée séparément sur Android (notification média, interruption d'appel, verrouillage écran et arrêt système) avant de la promettre aux utilisateurs.

## Langues et qualité des traductions

La parité des clés dans `src/i18n.ts` vérifie uniquement que les libellés de l'interface ont une entrée en français et en wolof. **Elle ne prouve pas que les contenus éditoriaux sont traduits.**

Le catalogue `src/content.ts` et le programme pédagogique `src/program.ts` contiennent encore des éléments principalement en français. Certains textes wolof sont provisoires et nécessitent une relecture compétente. Ne pas annoncer le catalogue comme entièrement bilingue ni marquer une traduction comme validée sans relecture humaine.

Le suivi dédié est ouvert dans [l'issue #33 — Compléter et valider les contenus en wolof](https://github.com/vjr221/niani-kids/issues/33). Le travail devra couvrir les titres, résumés, paroles, histoires, questions, objectifs pédagogiques, conseils, activités, mots-clés, jeux et ateliers, avec un état clair par contenu : à traduire, traduction provisoire, en relecture ou validé.

## Accessibilité et ergonomie

- Cibles tactiles visées : au moins 48 dp pour les commandes principales.
- Les commandes iconographiques doivent porter un `accessibilityRole`, un `accessibilityLabel` et, si nécessaire, un `accessibilityState`.
- Conserver un contraste lisible, une hiérarchie simple, des animations non indispensables et une expérience compréhensible avec TalkBack.
- Éviter les animations constantes et les sons automatiques ; privilégier les animations courtes déclenchées par l'enfant.

## Validation avant diffusion

1. `npx expo install --check`
2. `npx tsc --noEmit`
3. `node scripts/validate-translations.mjs`
4. `node scripts/validate-content.mjs`
5. `node scripts/validate-audio-catalog.mjs`
6. Export Expo et compilation APK depuis le commit exact.
7. Essais manuels sur un vrai appareil Android avec TalkBack, rotation/tailles de texte, liens externes, lecture audio et stockage hors ligne.
8. Vérifier politique de confidentialité et déclaration Data safety avant toute publication publique.

## Limites connues de cette étape

Le contrôle arithmétique est une barrière de friction, pas une preuve qu'un adulte est présent. La traduction complète du contenu wolof, sa relecture native, les masters audio, l'audit complet Google Play Families et les tests physiques doivent être terminés avant une publication publique.
