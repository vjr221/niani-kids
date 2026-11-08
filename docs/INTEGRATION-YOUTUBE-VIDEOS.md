# Intégration vidéo YouTube — Niani Kids
Mise à jour : 8 novembre 2026

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
