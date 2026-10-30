# Niani Kids — plan d'intégration du catalogue audio WordPress

## Dépendance obligatoire
Cette phase commence après l'intégration mobile et la validation des masters. Le site ne doit exposer que les titres approuvés pour lesquels le fichier exact, les paroles, la langue et les droits sont confirmés.

## Modèle de contenu recommandé
Commencer avec des articles WordPress catégorisés si cela correspond à l'installation actuelle. N'introduire un type de contenu personnalisé « Chansons » qu'après inspection du thème actif, des plugins et des contenus existants.

Champs éditoriaux à structurer :
- identifiant stable partagé avec l'application ;
- titre public et résumé ;
- paroles originales vérifiées ;
- langue réellement chantée (FR, WO, FR + WO) et statut de relecture linguistique ;
- durée issue du fichier réel ;
- fichier audio source, format de diffusion et empreinte SHA-256 ;
- statut interne de validation, auteur/validateur et date ;
- droits/licences des textes, compositions, voix et enregistrement ;
- image de couverture, texte alternatif et crédits.

Les statuts internes (à identifier, à écouter, relecture wolof, droits en attente, approuvé) ne doivent pas être rendus publics comme un badge de qualité. Un titre n'est public que si le statut interne est approuvé.

## Gabarit public d'une chanson
1. Titre et résumé.
2. Lecteur HTML5 accessible avec contrôles natifs, sans autoplay.
3. Paroles vérifiées, lisibles et structurées.
4. Langue et durée exactes.
5. Mention adulte/famille lorsque pertinente.
6. Visuel de couverture optimisé et texte alternatif.
7. Crédits ou licence quand requis.

Prévoir une gestion d'erreur claire si le média ne charge pas. Ne jamais afficher un faux bouton de lecture ni un lecteur sans source.

## Cohérence application / site
Le même identifiant stable doit servir sur mobile et WordPress. Conserver un manifeste de publication commun :
- id, title, language, duration, lyrics version, asset filename, SHA-256, editorial approval, wolof review, rights status, published URL.
La version mobile et la version web doivent pointer vers le même master approuvé ou vers des dérivés déclarés de ce master.

## Sécurité, confidentialité et performance
- Pas de lecture automatique.
- Pas d'intégration de lecteur tiers non nécessaire.
- HTTPS, cache et livraison mobile testés.
- Le média doit être accessible sans exposer l'administration WordPress.
- Sauvegarder WordPress avant les changements de thème ou de contenus.
- Vérifier permissions et protection anti-hotlink si configurées.
- Tester clavier, lecteur d'écran, affichage téléphone et réseau mobile faible.

## Ordre de mise en ligne
1. Inspecter WordPress en lecture seule : thème, plugins, structure des articles, médiathèque et permissions.
2. Faire une sauvegarde vérifiée.
3. Importer les seuls fichiers audio approuvés, en conservant une copie source.
4. Créer/compléter les fiches privées, tester le lecteur mobile et la page publique en prévisualisation.
5. Comparer les métadonnées web et mobile avec le manifeste source.
6. Publier les titres autorisés, puis tester les URL publiques depuis Android et iOS.

## Blocages au 30 octobre 2026
- L'accès WordPress via Novamira n'a pas répondu lors de la tentative de découverte des capacités.
- Les URL et identifiants d'attachement présents dans certaines branches Git n'ont pas été vérifiés en direct ; ils ne doivent pas être considérés comme des médias disponibles.
- Aucune chanson n'a été approuvée à l'écoute intégrale, et les droits ainsi que le wolof restent à vérifier.
- En conséquence, aucun audio n'est publié ou déclaré prêt à publier dans cette phase.

Cette spécification est préparatoire ; elle ne crée ni type de contenu, ni page, ni média dans WordPress.
