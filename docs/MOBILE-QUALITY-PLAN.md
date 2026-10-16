# Plan de qualité mobile — Niani Kids

## Changements de cette passe
- Recherche de bibliothèque insensible aux accents et à la casse.
- Filtres cumulables par catégorie, langue et favoris, avec remise à zéro et état vide.
- Barre basse ajustée pour les petits écrans et masquée quand le clavier apparaît.
- Plus d'espace de défilement en bas des pages et du lecteur.
- Traductions FR/Wolof regroupées et enrichies pour les libellés de navigation et de bibliothèque.

## Vérifications manuelles sur téléphone
1. Tester 320, 360, 393 et 430 dp de largeur, portrait, clavier ouvert et fermé.
2. Vérifier que le dernier bouton des pages longues reste atteignable au-dessus de la barre système.
3. Tester recherche sans accent (ex. « reve » pour « rêve »), filtres combinés, favoris vides et favoris remplis.
4. Vérifier que les réponses de quiz ne récompensent qu'une seule fois par question et que la progression reste cohérente après changement d'onglet.
5. Vérifier la restauration des favoris, étoiles, langue et ateliers après fermeture forcée.
6. Contrôler TalkBack, tailles de police système, zones tactiles (minimum 44–48 dp), contraste et orientation portrait.

## Publication Android — bloquants à lever
- Ajouter les fichiers originaux logo/personnages dans assets et les brancher dans l'interface et app.json.
- Exécuter `npm ci`, `npx tsc --noEmit`, `npx expo export --platform android`, puis un build EAS preview sur appareil physique.
- Vérifier les permissions Android effectives et ne conserver que celles justifiées par une fonction visible.
- Ajouter une politique de confidentialité publique et vérifier la déclaration Google Play Families, la cible d'âge et les liens externes.
- Vérifier que les paroles wolof sont validées par un locuteur natif et que les médias annoncés sont réellement disponibles.
- Tester les scénarios hors ligne, stockage corrompu et erreurs de lancement de liens externes.

Aucun APK n'est considéré comme validé par ce document : les tests doivent être exécutés par CI puis confirmés sur appareil réel.
