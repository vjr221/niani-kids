# Niani Kids — audit des autorisations et de la protection des enfants
Date de vérification : 8 novembre 2026

## Site WordPress — observations directes

- WordPress 7.1.4, PHP 8.3.36, HTTPS actif.
- Inscriptions publiques désactivées ; rôle par défaut : subscriber.
- Un seul compte utilisateur recensé avec rôle administrateur ; vérifier en interne que son identifiant de connexion n'est pas générique et protéger le compte par une authentification forte.
- Le rôle administrateur conserve les capacités WordPress habituelles de gestion complète. Ne pas réduire ni renommer ce compte sans créer et tester d'abord un compte administrateur de remplacement et vérifier l'accès de récupération.
- L'endpoint REST public `/wp/v2/users` renvoie 404 ; XML-RPC n'est pas accessible (405).
- `DISALLOW_FILE_EDIT` est activé ; les commentaires sur l'accueil sont fermés.
- Extensions actives observées : Duplicator Pro, Site Kit, Novamira Pro, Novamira, Really Simple SSL, Rank Math PRO, Rank Math, TranslatePress, WPForms Lite.
- Wordfence n'est pas dans la liste des extensions actives. Aucune conclusion n'est faite sur un éventuel WAF d'hébergement non visible depuis WordPress.
- Les réponses de l'accueil et de wp-json ne montrent pas encore d'en-têtes CSP ni X-Frame-Options. La page de connexion renvoie SAMEORIGIN et une politique frame-ancestors 'self'. À harmoniser prudemment au niveau du serveur/CDN après inventaire des scripts tiers et tests.
- Les mises à jour automatiques du cœur sont en configuration par défaut ; le cron WordPress est actif.

## Application mobile — observations du dépôt principal

- Expo SDK 54, React Native 0.81.5, version déclarée 1.2.0.
- Le plugin expo-audio est configuré avec `recordAudioAndroid: false` et `microphonePermission: false`.
- Aucun besoin fonctionnel identifié pour microphone, caméra, contacts ou géolocalisation dans les parcours actuellement examinés.
- Favoris, langue, étoiles et progression d'ateliers sont stockés localement via AsyncStorage.
- Les liens YouTube, TikTok, Facebook et Instagram passent par un contrôle parental arithmétique et une confirmation explicite. Cette barrière est une friction utile, pas une authentification d'adulte.
- Les permissions réellement intégrées au manifeste Android et à l'archive iOS doivent être contrôlées sur les builds natifs signés ; le seul fichier app.json ne constitue pas une preuve complète.
- La politique de confidentialité, les déclarations Google Play Data safety / Families et les tests sur appareil réel restent des points de validation de publication.

## Mesures à conserver

1. Aucun compte enfant, aucune publicité ciblée, aucun profilage, aucune géolocalisation et aucune collecte distante non nécessaire.
2. Pas de microphone ni d'enregistrement audio ; la lecture audio ne justifie pas l'accès au micro.
3. Liens externes réservés à l'espace Parents et précédés d'une confirmation adulte.
4. Données de progression locales, minimales et effaçables.
5. Aucun chat, commentaire public ou contenu généré par les enfants.
6. Les contenus wolof ne sont pas marqués comme validés avant relecture humaine.

## Plan de remédiation priorisé

- P0 : générer et inspecter le manifeste Android fusionné et l'Info.plist iOS ; confirmer la liste minimale de permissions et les SDK transitifs.
- P0 : vérifier le compte administrateur et activer une authentification forte (mot de passe unique, MFA si disponible) ; ne pas publier ni stocker de secrets.
- P1 : mettre en place des mises à jour régulières et un contrôle de vulnérabilités compatible avec Expo SDK 54 ; pas de `npm audit fix --force`.
- P1 : vérifier les sauvegardes Duplicator, leur emplacement hors racine publique, leur chiffrement, leur rétention et un test de restauration.
- P1 : vérifier Wordfence ou le WAF Hostinger existant avant d'ajouter une seconde couche de sécurité ; éviter les doubles blocages de l'API Novamira.
- P1 : définir des en-têtes de sécurité testés (CSP adaptée, HSTS après confirmation HTTPS complète, Referrer-Policy, Permissions-Policy, frame protection) sans casser TranslatePress, Rank Math, Site Kit, WPForms ni les médias.
- P1 : documenter les flux de données, finaliser la politique de confidentialité et les déclarations de boutique.
- P2 : tester TalkBack, grandes polices, contraste, cibles tactiles, hors ligne, lecture audio et sorties externes sur appareils réels.

## Références de conception

- ICO Children's Code : paramètres de confidentialité élevés par défaut, minimisation des données, géolocalisation désactivée par défaut, contrôles parentaux et absence de nudges poussant à partager des données.
- Apple App Review Guidelines, section Kids : liens externes et achats dans un espace parental ; restrictions fortes sur les données et SDK tiers.
- Les guides et exigences applicables doivent être adaptés au marché de lancement (Sénégal) et aux marchés futurs ; ce document n'est pas un avis juridique.
