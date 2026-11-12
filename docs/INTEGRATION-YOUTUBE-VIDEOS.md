# Bibliothèque vidéo Niani Kids — intégration mobile

Mise à jour : 12 novembre 2026

## État éditorial
- La chaîne officielle n'a encore aucune vidéo publiée et vérifiée à intégrer.
- Le catalogue `src/videoCatalog.ts` reste vide.
- Ne jamais inventer d'identifiant YouTube, miniature, durée, date ou URL.
- Les projets de clips sont des briefs de production, pas des publications.

## Première production prioritaire
« Niani Kids, c'est parti ! » — clip de présentation.
- Format : 16:9, 24 images/s, 5 à 8 secondes par plan, 4K si disponible.
- Direction : animation 3D chaleureuse, mouvements doux, personnages cohérents.
- Personnages : Samba, Awa, Bobo et Baobab.
- Avant export : écouter le master intégral, synchroniser les paroles, vérifier les caractères wolof, contrôler les droits, la miniature et la lisibilité sur téléphone.

## Ajout d'une vidéo
1. Publier réellement sur la chaîne officielle.
2. Confirmer le statut public et l'autorisation d'intégration.
3. Relire titre, description, langue, tranche d'âge, durée, miniature et droits.
4. Ajouter une entrée dans `videoCatalog` avec `public`, `reviewed` et `embeddable` à true uniquement après ces vérifications.
5. Tester l'ouverture via le contrôle adulte et sur appareil réel.

## Protection des enfants
- Aucun autoplay.
- Les liens externes passent par le contrôle adulte existant.
- Pas de SDK YouTube, WebView, publicité, analytics ou permission appareil supplémentaire.
- L'interface de cette première version reste en français ; les libellés wolof seront ajoutés après relecture linguistique.

Chaîne officielle : https://youtube.com/@nianikids
