# Niani Kids — décisions de refonte UX mobile

Date : 13 novembre 2026  
Périmètre : application Expo / React Native, enfants de 0 à 6 ans et espace Parents.

## Synthèse des références

Les références fournies par le projet convergent vers une expérience chaleureuse, simple et incarnée :
- La capture réelle Android met en évidence un besoin de navigation équilibrée, lisible et répartie sur toute la largeur.
- La maquette HTML « Accueil haute fidélité » propose une chanson du jour, quatre portes personnages, un compteur d'étoiles et un espace Parents clairement identifiable.
- Le mockup de direction artistique proposé dans la conversation ajoute des cartes éditoriales, des aperçus de contenus et une hiérarchie plus claire entre musique, vidéos, jeux et ateliers.
- La bible d'identité visuelle et le registre des médias du dépôt restent les références prioritaires pour les personnages et les assets. Les personnages canoniques ne doivent pas être redessinés ou remplacés par des variantes non validées.

## Décisions retenues

### Navigation
Conserver sept rubriques principales dans cet ordre :
1. Accueil
2. Vidéos
3. Comptines
4. Jouer
5. Explorer
6. Atelier
7. Parents

Les routes Écouter et Favoris restent accessibles comme écrans secondaires. La barre doit distribuer chaque onglet à largeur égale, respecter les zones de sécurité Android et conserver des cibles tactiles confortables. Éviter les libellés tronqués.

### Accueil
- Conserver l'identité visuelle Niani Kids et le hero existant.
- Ajouter quatre portes de découverte : Samba → Comptines ; Awa → Atelier ; Bobo → Jouer ; Baobab → Explorer.
- Employer les illustrations individuelles canoniques déjà embarquées pour Samba, Awa et Bobo.
- Le Baobab reste représenté par un pictogramme provisoire tant qu'un PNG individuel détouré n'est pas intégré et vérifié.
- Afficher le nombre d'étoiles déjà acquis localement, sans classement public ni mécanisme de pression.
- Conserver « Reprendre » et la recherche existants.
- Ne pas afficher de « chanson du jour » avec un bouton lecture tant qu'un master audio réellement disponible et validé n'est pas lié à la fiche.

### Direction artistique
- Palette : crème et jaune soleil comme fonds chaleureux, vert baobab pour les actions principales, bleu Samba, rose/corail Awa, rouge/jaune Bobo.
- Cartes arrondies, contraste suffisant, typographie large et claire, illustrations 3D officielles.
- Les emojis restent des repères secondaires ; les assets canoniques doivent les remplacer lorsqu'ils existent.
- Animations discrètes et non essentielles ; l'interface doit rester rapide sur les téléphones Android modestes.

### Sécurité et pédagogie
- Les liens externes restent soumis au contrôle parental déjà présent.
- Pas de publicité, de compte enfant, de localisation ni de classement public.
- Jeux sans minuterie ni sanction punitive ; récompenses locales non compétitives.
- Ateliers présentés comme activités à réaliser avec un adulte.
- Le français et le wolof utilisent les traductions du catalogue ; ne pas inventer de traduction wolof. Les contenus wolof restent soumis à validation humaine.

## Lots de réalisation

1. P0 — Navigation et zones de sécurité : largeur égale, alignement, libellés, petits écrans.
2. P1 — Accueil incarné : portes personnages, étoiles, reprise et recherche.
3. P2 — Comptines et lecteur : disponibilité audio réelle, statuts honnêtes, favoris.
4. P3 — Vidéos et bibliothèque : miniatures, filtres et états vides.
5. P4 — Jouer et Explorer : activités progressives et découverte de la culture sénégalaise.
6. P5 — Atelier et Parents : fiches pratiques, accompagnement adulte et réglages.

## Critères d'acceptation

- TypeScript et validations automatiques réussis.
- Export Android réussi sur le commit final.
- Test manuel sur petit écran Android : sept onglets visibles, largeur équilibrée, aucun libellé coupé.
- Test TalkBack et tailles de texte agrandies.
- Vérification des images, des liens, du stockage local et des états sans audio.
- Aucun nouveau chemin d'image ajouté sans fichier présent dans Git et vérification du rendu.
- Ne pas annoncer une fonction audio comme opérationnelle si aucun master correspondant n'est réellement disponible.
