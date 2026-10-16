# Plan de qualité mobile — Niani Kids

## Améliorations incluses
- Recherche insensible aux accents et à la casse.
- Filtres par catégorie, langue et favoris, avec état vide et remise à zéro.
- Raccourcis de l’accueil reliés aux bons onglets.
- Barre de navigation masquée lorsque le clavier est ouvert et marge de défilement renforcée.
- Mauvaise réponse au quiz : l’enfant peut réessayer sans perdre de progression ni gagner d’étoile.
- Préférences, favoris et étoiles restaurés depuis AsyncStorage.
- Lecture vocale du texte disponible dans la fiche, avec bouton d’arrêt.
- Fiche explicite « bientôt disponible » lorsque le contenu complet n’existe pas.

## Vérifications manuelles à effectuer
1. Tester les largeurs 320, 360, 393 et 430 dp, clavier ouvert/fermé.
2. Vérifier les dernières actions des pages longues et la barre de navigation Android.
3. Tester la recherche sans accent (ex. « reve »), filtres combinés et listes vides.
4. Vérifier que seule une bonne réponse attribue une étoile, une seule fois par question.
5. Fermer et relancer l’application pour vérifier favoris, étoiles, langue et ateliers.
6. Tester TalkBack, grandes polices, zones tactiles de 44–48 dp, fonctionnement hors ligne et stockage corrompu.
7. Faire relire les paroles wolof par un locuteur natif avant diffusion.

## Bloquants avant publication
- Les fichiers binaires originaux du logo et des quatre personnages doivent être ajoutés au dépôt et intégrés au bundle.
- Exécuter CI puis un build Android preview et tester l’APK sur un appareil réel.
- Vérifier les permissions Android, la politique de confidentialité publique, les déclarations Google Play Familles et les liens externes.
- Relier les fiches aux audios/vidéos réellement publiés. Le texte lu par synthèse vocale n'est pas un enregistrement musical.
- Aucun APK n'est déclaré validé sur appareil physique par ce document.
