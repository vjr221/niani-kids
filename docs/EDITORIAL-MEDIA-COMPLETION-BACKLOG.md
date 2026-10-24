# Niani Kids — backlog de finalisation éditoriale et médias

Date de l'audit : 2026-10-21  
Branche de référence : `feat/niani-kids-modernization-oct-2026`

## État vérifié dans le code

### Catalogue et langues
- Le catalogue `src/content.ts` utilise les statuts `FR`, `WO` et `FR + WO`.
- Le dernier audit du catalogue a relevé 37 contenus : 36 français uniquement, 1 wolof uniquement et 0 déclaré bilingue.
- L'entrée wolof `song-jamm` porte explicitement une note de validation par un locuteur natif.
- Le contrôle des clés dans `src/i18n.ts` garantit la parité structurelle de l'interface, mais ne prouve pas la traduction des histoires, chansons et ateliers.
- `src/program.ts` contient le programme pédagogique et les ateliers en français; une couverture wolof doit être conçue séparément, avec une revue linguistique.

### Audio
- `src/audioCatalog.ts` a actuellement un catalogue vide (`audioCatalog: []`).
- Aucun master ne doit être relié à un contenu sur la base du nom de fichier, de son ordre d'importation ou d'une supposition.
- Pour publier un master, consigner au minimum : identifiant de contenu, fichier local existant, titre confirmé, langue confirmée, écoute éditoriale, droits confirmés et approbation.
- La synthèse vocale du texte n'est pas un master musical.

### Illustrations
- Les portraits, vues en pied et illustrations d'activités de Samba, Awa et Bobo sont répertoriés dans `assets/README.md`.
- Les planches d'expressions sont disponibles, mais leur intégration doit être vérifiée écran par écran.
- Le README précise que les nouveaux PNG du lot graphique d'octobre ne sont pas tous présents comme binaires dans Git. Les fichiers manquants ne doivent pas être référencés par `require(...)`.
- Les visuels composites sont des références de marque et ne remplacent pas les fichiers individuels des personnages.
- À valider : Baobab détouré, icône mobile carrée, transparence du logo et optimisation des images.

## Ordre de réalisation recommandé

1. **Inventaire des masters** : vérifier les fichiers audio réellement disponibles; écouter, identifier et confirmer chaque fichier avant association.
2. **Wolof — première tranche** : commencer par l'accueil, les consignes communes, les 5 contenus les plus visibles et les ateliers essentiels. Préparer les traductions comme brouillons éditoriaux, puis faire relire par un locuteur natif avant diffusion.
3. **Couverture du programme** : étendre le schéma de langue aux histoires, objectifs pédagogiques, consignes et activités; ajouter un audit automatisé qui distingue « traduit », « en attente de relecture » et « approuvé ».
4. **Assets** : copier les originaux nécessaires dans Git, vérifier leur présence, leurs dimensions et leur transparence, puis les intégrer aux écrans concernés.
5. **Validation** : exécuter typecheck, validation du catalogue, audit wolof, export Expo Android et génération de l'APK; tester ensuite l'installation et les parcours sur appareil réel.

## Critères de sortie

- Aucun contenu ne porte le statut bilingue sans texte dans les deux langues.
- Aucun contenu wolof n'est présenté comme validé avant revue humaine.
- Aucun lecteur ne propose un master absent, non identifié ou non approuvé.
- Aucun import d'image ne pointe vers un fichier absent du dépôt.
- La compilation Android passe sur le commit testé; le test sur appareil est enregistré séparément.

## Limites de cet état

Ce document formalise un audit du code et les tâches suivantes. Il ne constitue pas une preuve que les masters ont été exportés, que les nouveaux visuels ont été tous intégrés, ni que l'APK a été testé sur un appareil physique.
