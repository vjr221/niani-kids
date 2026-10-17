# Niani Kids — registre des générations musicales ElevenLabs

Dernière vérification : 17 octobre 2026 (UTC)
Flow : https://elevenlabs.io/app/flows/uiSMmtS8Q8pbnavPtL9o

## État réel du flow

18 nœuds musicaux sont visibles dans le flow (pas 19 : la vérification la plus récente renvoie 18). 17 sont terminés et 1 est en échec. Il n'y a aucune connexion entre nœuds. « Terminé » signifie uniquement que la génération a fini ; cela ne vaut pas validation éditoriale.

| Titre du nœud | Statut de génération | ID du nœud | Étape suivante |
|---|---|---|---|
| Bonjour, bonjour ! — Maquette 01 | Terminé | `kB7oBzZzGctK7JwPmNMX` | Écouter et comparer à la maquette 02 |
| Bonjour, bonjour ! — Maquette 02 | Terminé | `9IdjoiPqoSuW3f4mh3Yk` | Écouter et comparer à la maquette 01 |
| Bienvenue chez Niani Kids | Terminé | `EySRjmydtZvNH2E1tp7d` | Écoute éditoriale |
| Niani Kids, c’est parti ! | Terminé | `CHBtysSOtl4Uf0KkbDTj` | Écoute éditoriale |
| Les couleurs dansent | Terminé | `AafPBQCZFUqYKkRJgfQ8` | Écoute éditoriale |
| Dors, petit cœur | Terminé | `1Zg9MDMXt8vmVGz8YgCI` | Écoute attentive : berceuse |
| Les animaux du Sénégal | Terminé | `EWIXqb9PnXbyvmSIy4xd` | Écoute éditoriale |
| Comptons jusqu’à 10 | Terminé | `GH9mHo2zoDxah3Nr7Q6b` | Vérifier exactitude des nombres et langues |
| Bouge et stop ! | Terminé | `0wHGEllJBlY724zf9VSL` | Écoute éditoriale |
| Conte musical du Baobab | Terminé | `foTIoK58LGYmNk1t0PM9` | Vérifier narration et fin |
| Nuyoo, nuyoo ! — Bonjour en français et wolof | Terminé | `7kSa0NniXSHcrtX0PjyP` | Relecture wolof compétente obligatoire |
| Les formes | Terminé | `Qy4woHyIzwUHt3Qaf52V` | Vérifier vocabulaire et consignes |
| Les jours de la semaine | Terminé | `AKfGdn09vYjRD9N5lDZN` | Vérifier l'ordre et la prononciation |
| Les fruits du Sénégal | Terminé | `XtciMl2ogv33uaMCxtHA` | Vérifier vocabulaire local |
| Je lave mes mains | Terminé | `YRVYZlQVFyVEJvJWcaQ4` | Vérifier les consignes d'hygiène |
| Quand je ris, quand je pleure | Terminé | `wSKmO6mTsPnOySfJwquv` | Vérifier le ton et les émotions |
| Je brosse mes petites dents — version A | Échec | `okyVoqnA0AvO4K7VdOJY` | Ne pas relancer avant comparaison avec la version B |
| Ma famille, mes amis | Terminé | `TPPsTRB9e8TmLEjssDme` | Vérifier que les paroles sont inclusives et adaptées |
| Je brosse mes petites dents — version B | Terminé | `577nL1TrUo19ggB3hOWf` | Écouter et comparer avant sélection |

## Règles avant publication

- Ne pas associer un fichier nommé `content.mp3` à un titre sur la base de son nom ou de son ordre.
- Conserver un master source et son SHA-256 ; identifier les doublons exacts.
- Vérifier écoute complète, paroles, langue, qualité sonore, début/fin, adéquation 0–6 ans et droits.
- Faire relire toute parole wolof par une personne compétente avant publication.
- Enregistrer l'approbation dans le registre éditorial avant d'ajouter un fichier à `src/audioCatalog.ts`.
- Ne pas annoncer ces générations comme des chansons disponibles dans l'application tant que le master n'a pas été identifié, approuvé et intégré.

## Prochain lot de contrôle conseillé

1. Comparer les deux maquettes « Bonjour, bonjour ! » et choisir une direction sonore.
2. Vérifier « Bienvenue chez Niani Kids » et « Niani Kids, c’est parti ! » pour éviter que l'intro et l'outro se ressemblent trop.
3. Valider en priorité les comptines d'hygiène, de nombres et de couleurs, puis la berceuse.
4. Préparer ensuite un manifeste des masters réellement téléchargés et les lier à leurs identifiants de contenu stables.


## Contrôle de récupération des masters — 17 octobre 2026

- Recherche dans la bibliothèque d'assets audio ElevenLabs via la connexion disponible : aucun asset audio n'est retourné.
- La lecture des paramètres de nœuds confirme les titres et les paroles de certaines générations, mais ne retourne pas les fichiers audio maîtres ni leurs URL de téléchargement.
- Le flow expose les statuts de génération, pas les sessions de génération antérieures nécessaires pour réafficher les résultats via l'outil de résultats. Aucune génération n'a été relancée.
- Conclusion : récupération automatique des masters non disponible par les outils actuellement accessibles dans cette conversation. Ne pas créer de liens de téléchargement supposés.

### Procédure de transfert recommandée

1. Ouvrir le flow ElevenLabs ci-dessus dans le compte qui a créé les morceaux.
2. Ouvrir les résultats des générations terminées et télécharger le fichier audio maître de chaque titre à conserver.
3. Déposer les fichiers dans un dossier local dédié, sans les renommer au hasard ; consigner le titre exact affiché dans ElevenLabs.
4. Téléverser ici les masters (ou un ZIP contenant les fichiers). L'inventaire technique pourra alors calculer les SHA-256, détecter les doublons et préparer le manifeste.
5. Après écoute et validation éditoriale, copier uniquement les fichiers approuvés dans le projet mobile et compléter `src/audioCatalog.ts`.

Aucun fichier audio n'est actuellement approuvé pour la publication dans l'application.
