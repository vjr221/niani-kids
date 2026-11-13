# Niani Kids — audit et première modernisation mobile

Date de l'audit : 13 novembre 2026
Dépôt : https://github.com/vjr221/niani-kids
Base : branche `main` au commit `3c75fcb824cf4e91e8336742a98e4854b44c841e`

## État constaté avant modification

- Application Expo SDK 54 / React Native 0.81 / TypeScript.
- Écrans déjà présents : Accueil, Vidéos, Bibliothèque, Jouer, Explorer, Atelier et Parents.
- Catalogue officiel des chansons dans `src/officialSongCatalog.ts`, catalogue de lecture dans `src/audioCatalog.ts`, contenus éditoriaux locaux dans `src/content.ts`.
- Favoris, langue et étoiles sauvegardés avec AsyncStorage.
- Lecteur audio `src/AudioPlayerCard.tsx` déjà présent dans la fiche détail; il gère lecture/pause, progression et commandes de saut.
- Logo officiel, bannière et visuels individuels de Samba, Awa et Bobo déjà intégrés. Baobab existe comme guide éditorial, mais pas comme fichier de personnage dédié identifié dans `assets/brand`.
- Navigation avant audit : sept onglets visibles, dont Vidéos, Explorer et Atelier. Cela surcharge la navigation par rapport aux cinq destinations enfant/adulte des wireframes.
- Les wireframes sont des propositions visuelles : certaines cartes et certains contes sont des exemples et ne doivent pas être ajoutés au catalogue sans contenu réel.

## Points forts

1. Identité déjà reconnaissable : fond crème, vert profond, jaune, accents bleu/corail, logo et personnages.
2. Séparation des données éditoriales et de l'interface : le catalogue peut être conservé pendant la refonte.
3. Fonctionnalités éducatives existantes : mini-jeux, ateliers parent-enfant, parcours d'exploration.
4. Favoris persistants, interface FR/Wolof et contrôles d'accessibilité déjà partiellement présents.
5. Garde parentale avant les liens externes et écran Parents avec ressources et informations légales.

## Risques et améliorations à traiter

- `App.tsx` regroupe beaucoup d'écrans et de styles : à terme, extraire les écrans, composants communs et tokens sans refactor massif en une seule fois.
- La navigation exposait trop de destinations au même niveau. Les ateliers et l'exploration doivent rester accessibles depuis Jouer, et les vidéos depuis l'accueil, sans monopoliser la barre principale.
- Le lecteur audio est actuellement affiché dans la fiche détail; il n'est pas encore un mini-lecteur persistant entre les onglets. Ne pas simuler un état de lecture qui ne correspondrait pas au lecteur natif.
- Le véritable historique d'écoute, les téléchargements hors ligne et les limites de temps ne sont pas encore confirmés comme fonctionnalités complètes dans l'écran Parents.
- Vérifier les masters approuvés, les URL WordPress et la validation linguistique Wolof avant toute publication. Ne jamais exposer des pistes en préparation.
- Tester les petits écrans Android, TalkBack, zones tactiles, mode hors ligne et comportement audio sur appareil réel.

## Première tranche livrée dans cette branche

- Barre de navigation principale ramenée à cinq entrées : Accueil, Chanter, Écouter, Jouer, Parents.
- Écrans secondaires conservés comme routes accessibles depuis les parcours existants : Vidéos, Bibliothèque (compatibilité), Explorer, Atelier et Favoris.
- Nouvel écran Écouter, séparant les histoires et berceuses du catalogue musical, avec filtres et cartes branchées sur les vrais contenus existants.
- Les accès Ateliers et Explorer sont ajoutés dans Jouer pour conserver les fonctionnalités qui ne sont plus dans la barre principale.
- Ajout sur l'accueil d'un raccourci « Reprendre » qui mémorise localement le dernier contenu ouvert, sans inventer de progression audio.
- Harmonisation légère des cartes et de la barre de navigation, sans modifier les palettes, les contenus, les identifiants de chansons ni les règles d'approbation audio.

## Suite recommandée

1. Vérifier le build Android et les tests automatiques de cette branche.
2. Faire une passe de validation visuelle sur téléphone Android réel.
3. Extraire progressivement `App.tsx` en composants et écrans dédiés.
4. Concevoir un vrai mini-lecteur persistant en partageant une instance de lecteur Expo Audio au niveau racine; cela nécessite une implémentation et des tests audio spécifiques.
5. Construire les réglages Parents réellement persistants : mode hors ligne, lecture automatique, historique et limite de durée uniquement lorsqu'ils sont implémentés et vérifiables.
6. Ajouter un Baobab illustré dédié après validation de l'asset officiel, sans détourer une planche de personnages automatiquement.