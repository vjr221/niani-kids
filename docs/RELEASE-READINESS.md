# Checklist de préparation à la publication — Niani Kids

Ce document distingue ce qui fonctionne dans le dépôt de ce qui doit encore être livré ou vérifié avant une diffusion publique. Niani Kids s'adresse aux enfants de 0 à 6 ans : ne pas considérer un export Android réussi comme une validation de publication.

## État technique vérifiable

- [x] Application Expo / React Native avec accueil, bibliothèque, favoris, jeux, ateliers et espace Parents.
- [x] Sauvegarde locale des favoris, de la langue choisie, des étoiles et des ateliers terminés.
- [x] Contrôle TypeScript et export du bundle Android dans GitHub Actions.
- [x] Confirmation parentale avant l'ouverture des plateformes externes.
- [ ] Construire et installer un APK de prévisualisation signé sur un appareil Android réel.
- [ ] Tester une installation neuve, une mise à jour et le comportement hors ligne.
- [ ] Vérifier TalkBack, agrandissement du texte, contraste et petits écrans.

## Bloqueurs avant une version publique

### Identité visuelle et médias
- [ ] Ajouter le logo officiel optimisé et les exports séparés validés de Samba, Awa, Bobo et du Baobab.
- [ ] Remplacer les emojis de démonstration par les illustrations officielles lorsqu'elles sont livrées.
- [ ] Produire et intégrer les enregistrements audio finaux ; tant qu'ils ne sont pas intégrés, nommer le bouton « Écouter le texte » et ne pas promettre une chanson chantée.
- [ ] Relier chaque contenu vidéo à son URL officielle exacte et testée.
- [ ] Faire valider les paroles et la prononciation wolof par un locuteur natif.
- [ ] Archiver les autorisations d'utilisation commerciale des voix, musiques, illustrations et échantillons.

### Confidentialité et sécurité des enfants
- [ ] Rédiger et publier une politique de confidentialité accessible par URL publique.
- [ ] Renseigner un contact officiel de l'éditeur dans la fiche de la boutique et dans la politique.
- [ ] Vérifier les règles Google Play Families et toutes les déclarations de la fiche Play Console.
- [ ] Confirmer que les SDK et dépendances n'introduisent ni publicité, ni suivi, ni collecte non souhaitée.
- [ ] Vérifier que les liens externes restent clairement signalés et réservés à une action accompagnée par un adulte.
- [ ] Tester le parcours complet sans compte utilisateur et confirmer quelles données sont stockées localement.

### Publication Android
- [ ] Confirmer l'accès au compte Expo/EAS et configurer le secret GitHub `EAS_TOKEN`.
- [ ] Lancer le profil EAS `preview`, télécharger l'APK et tester sur Android.
- [ ] Corriger les défauts bloquants constatés sur appareil réel.
- [ ] Générer l'AAB de production, vérifier le nom, l'icône, la version et la signature.
- [ ] Préparer les captures d'écran, la description de la boutique, la classification d'âge et les coordonnées de support.
- [ ] Conserver le numéro de version, le commit source, le résultat des tests et le SHA-256 de chaque binaire publié.

## Test d'acceptation avant diffusion

La version ne peut être considérée comme prête que si :

1. L'installation, le lancement, la navigation et le retour Android fonctionnent sans plantage.
2. Favoris, langue, étoiles et ateliers terminés survivent à la fermeture puis au redémarrage.
3. La lecture vocale s'arrête lorsqu'on ferme le lecteur ou quitte un contenu.
4. Les boutons, les cibles tactiles et les libellés sont utilisables avec TalkBack.
5. Aucun écran ne prétend lire un fichier audio ou une vidéo absente.
6. Les contenus wolof publiés ont été relus par un locuteur natif.
7. La politique de confidentialité, le contact éditeur et les déclarations de la boutique sont en place.
8. Un adulte peut comprendre quels liens quittent l'application et accompagner l'enfant.

## Règle de décision

Un contrôle TypeScript réussi et un export Android réussi prouvent seulement que le code se compile et que le bundle peut être exporté. Ils ne prouvent pas qu'un APK signé a été produit, que l'application a été testée sur appareil réel, ni qu'elle respecte à elle seule les exigences de publication pour enfants.
