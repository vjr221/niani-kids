# Intégration vidéo YouTube — Niani Kids
Mise à jour : 8 novembre 2026

## État réel du lancement (12 novembre 2026)
- La chaîne YouTube Niani Kids n'a encore publié aucune vidéo.
- Le catalogue mobile `src/videoCatalog.ts` doit donc rester vide jusqu'à la première publication réelle et à sa validation éditoriale.
- Les idées de premiers clips (présentation de la marque, « Nañu fecc ! », « Ñu ngi fii ! ») sont des pistes de production, pas des vidéos publiées ni des liens à intégrer.
- Ne jamais créer de fiche vidéo, miniature, date ou ID YouTube à partir d'un projet de clip non publié.
- La page WordPress `/videos/` doit conserver son état d'attente et son message « Aucune vidéo validée pour le moment » tant qu'aucune vidéo ne satisfait les critères.

## Préparation du premier clip — « Niani Kids, c'est parti ! »
Cette fiche est un brief de préparation, pas une publication ni une entrée du catalogue.

### Positionnement
- Rôle : présenter l'univers Niani Kids et installer le nom de la marque.
- Public : enfants de 0 à 6 ans, avec les parents comme accompagnateurs.
- Langues : français et wolof uniquement si les paroles finales ont été relues.
- Format principal : 16:9, 24 images/s, cible 5 à 8 secondes par plan ; 4K si les sources le permettent.
- Direction visuelle : animation 3D chaleureuse, couleurs lumineuses, gestes doux et lisibles ; conserver strictement les modèles de Samba, Awa, Bobo et Baobab.

### Contrôle avant export
- [ ] Master audio final choisi et écouté du début à la fin.
- [ ] Paroles affichées conformes au master, accents et caractères wolof vérifiés.
- [ ] Identité des quatre personnages cohérente d'un plan à l'autre.
- [ ] Aucun logo déformé, texte illisible ou élément parasite.
- [ ] Aucun flash rapide, mouvement brusque, peur ou surcharge visuelle.
- [ ] Montage final en 16:9 ; niveau sonore homogène ; début et fin propres.
- [ ] Miniature lisible sur téléphone, sans promesse trompeuse.
- [ ] Droits des images, voix, musique et éléments graphiques vérifiés.

### Métadonnées à préparer (à compléter après validation du master)
- Titre de travail : « Niani Kids, c'est parti ! | Chanson de bienvenue »
- Description de travail : « Bienvenue dans l'univers Niani Kids ! Des chansons, comptines, berceuses et activités pour apprendre, chanter et grandir en famille, en français et en wolof. »
- Playlist envisagée : « Comptines et chansons ».
- Langue : à confirmer selon le master final (FR ou FR + WO).
- Audience YouTube : déclarer précisément si la vidéo est conçue pour les enfants, dans YouTube Studio.
- Tags, durée, date, URL et ID YouTube : à renseigner uniquement après publication réelle.

### Après publication
1. Copier l'URL publique depuis YouTube Studio.
2. Vérifier l'ID extrait de l'URL et l'état public de la vidéo.
3. Vérifier manuellement l'autorisation d'intégration.
4. Faire une revue parent/enfant sur téléphone et ordinateur.
5. Seulement ensuite, créer l'entrée correspondante dans src/videoCatalog.ts et sur /videos/.

## Source éditoriale unique
- Application : `src/videoCatalog.ts`.
- Site : page WordPress `/videos/`, à compléter au fil des publications.
- Chaîne officielle : `https://youtube.com/@nianikids`.

## Champs obligatoires pour chaque vidéo
- Identifiant stable Niani Kids.
- ID YouTube (11 caractères), titre, description courte.
- Catégorie : comptine, berceuse, histoire, apprendre, Sénégal ou coulisses.
- Langue : FR, WO ou FR + WO.
- Tranche d'âge : 0–2, 3–4, 5–6 ans ou famille.
- Durée et date de publication si connues.
- Miniature officielle YouTube ou image optimisée de la médiathèque.
- Vérification humaine, statut public et autorisation d'intégration confirmée.

## Workflow de publication
1. Préparer la fiche avant publication sans inventer d'ID, de miniature ni de date.
2. Publier la vidéo sur la chaîne officielle avec audience déclarée correctement dans YouTube Studio.
3. Confirmer que la vidéo est publique et que l'intégration est autorisée. Une vidéo peut rester non intégrable même si elle est publique.
4. Vérifier titre, description, langue, sous-titres disponibles, miniature, durée, droits et liens.
5. Ajouter la fiche à `videoCatalog` et la même entrée à la page WordPress.
6. Tester l'affichage mobile, la connexion lente, la navigation clavier et le contrôle parental.
7. Mettre en avant une vidéo sur l'accueil seulement après validation.

## Site web
- Préférer le domaine d'intégration `youtube-nocookie.com` en mode de confidentialité renforcée.
- Ne pas charger le lecteur ni les ressources YouTube avant l'action explicite de lecture : afficher d'abord une miniature locale ou distante et un bouton « Lire la vidéo ».
- Ajouter `loading="lazy"`, un titre accessible à l'iframe et une zone 16:9 responsive. Le lecteur YouTube doit respecter les dimensions minimales officielles.
- Aucun autoplay. Ne pas démarrer de son automatiquement.
- Laisser un lien clair vers la page YouTube en cas d'échec de l'intégration.
- Éviter d'insérer un iframe dans la page tant que l'ID et le statut d'intégration n'ont pas été vérifiés.

## Application mobile
- La bibliothèque vidéo est préparée via `src/videoCatalog.ts`.
- Le catalogue reste vide tant qu'aucune vidéo n'a passé la revue ; l'écran présente un état « arrive bientôt » et un lien vers la chaîne.
- Les liens YouTube s'ouvrent via le contrôle adulte existant. L'application ne lance pas de WebView ni de lecteur intégré pour les enfants.
- Ne pas ajouter de SDK YouTube, de publicité, d'analytics, de compte enfant ou de permission appareil pour lire les vidéos.
- Ajouter uniquement des vidéos publiques, relues et déclarées intégrables. Ne pas supposer qu'une vidéo privée/non répertoriée convient à la médiathèque.

## Playlists
Créer des playlists officielles distinctes :
- Comptines et chansons
- Berceuses
- Histoires animées
- Jouer et apprendre
- Le Sénégal des enfants
- Shorts et extraits

Une playlist n'est affichée que si son URL/ID est fourni et vérifié. Les Shorts peuvent être relayés sur les réseaux mais la page Niani Kids doit privilégier la lecture adaptée au grand écran et au téléphone.

## Références officielles
- YouTube Embedded Players and Player Parameters : https://developers.google.com/youtube/player_parameters
- YouTube Data API — Videos resource : https://developers.google.com/youtube/data/reference/rest/v3/videos
- YouTube Help — Privacy Enhanced Mode : https://support.google.com/youtube/answer/171780

## À ne pas faire
- Ne pas inventer d'ID, de durée, de date de publication ou de miniature.
- Ne pas publier une vidéo sans vérification des droits et de l'audience.
- Ne pas activer autoplay.
- Ne pas intégrer automatiquement toutes les vidéos de la chaîne sans filtre éditorial.
