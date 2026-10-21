# Niani Kids — feuille de route de modernisation mobile

Date : 17 octobre 2026  
Périmètre : application Expo / React Native, enfants de 0 à 6 ans, lancement Sénégal puis diaspora.

## Décisions produit

1. **Audio authentique avant tout** : ne pas présenter la synthèse vocale comme une chanson. Chaque piste publiée doit avoir un master audio validé, une langue confirmée, une durée exacte, une attribution/droits vérifiés et un statut éditorial explicite.
2. **Conception adaptée aux tout-petits** : boutons larges, libellés simples, peu d'étapes, retour visuel calme, aucune pénalité punitive, pas de publicité intrusive ni de mécanisme addictif.
3. **Parents aux commandes** : les liens vers YouTube/TikTok sont accessibles depuis un espace clairement réservé aux adultes, avec avertissement avant ouverture. Aucun lien externe directement dans le parcours de jeu enfant.
4. **Respect de la vie privée par défaut** : pas de compte enfant, de localisation, de publicité ciblée, de collecte de données ou d'analytique non nécessaire. Toute intégration future doit être évaluée pour les règles applicables aux applications destinées aux enfants.
5. **FR/Wolof avec validation humaine** : l'interface peut proposer les deux langues, mais les paroles, prononciations et traductions wolof restent « à valider » tant qu'un locuteur compétent ne les a pas approuvées.
6. **Culture sénégalaise authentique** : conserver Samba, Awa et Bobo comme trio principal et le Baobab comme guide-conteur distinct. Privilégier les chansons originales ou traditionnelles dont les droits d'adaptation et d'enregistrement ont été vérifiés.

## Priorités d'exécution

### P0 — Fiabilité et sécurité
- Faire passer TypeScript, export Expo Android et tests automatisés.
- Vérifier les états de chargement, les erreurs de stockage local et la restauration des favoris, langue et progression.
- Vérifier les permissions Android : aucune permission sensible ne doit être ajoutée sans besoin justifié.
- Contrôler les liens externes, l'accessibilité TalkBack, les cibles tactiles et les tailles de texte agrandies.
- Ajouter une politique de confidentialité publique et les coordonnées de contact avant publication.

### P1 — Bibliothèque audio réelle
- Construire un catalogue structuré : identifiant stable, titre, catégorie, langue, durée, master audio, transcription/paroles, droits, validation FR/Wolof, image, date de contrôle et statut de publication.
- Connecter un lecteur audio natif Expo compatible avec la version Expo du projet, avec lecture/pause/arrêt, progression, reprise, gestion de fin/erreur et arrêt quand on quitte la fiche.
- Prévoir une expérience réseau faible : ne jamais afficher une piste comme disponible hors ligne si son fichier n'est pas présent localement.
- Ne pas intégrer les MP3 tant que chaque fichier n'est pas identifié par écoute/transcription et associé à la bonne fiche.

### P2 — Expérience et accessibilité
- Consolider le système de design : typographie lisible, espaces cohérents, contrastes, cartes simples et animations non indispensables.
- Rendre la navigation, les filtres et les états vides compréhensibles au lecteur d'écran.
- Ajouter les états « à venir », « paroles en relecture » et « audio non disponible » sans faire croire qu'une fonction est opérationnelle.
- Réduire les rerendus et vérifier les performances sur Android d'entrée de gamme.

### P3 — Éducation et fidélisation saine
- Jeux sans minuterie, sans classement public, sans achat et sans pression quotidienne.
- Récompenses locales non compétitives ; une bonne réponse ne doit être comptée qu'une fois par question affichée.
- Ateliers accompagnés d'un adulte avec consignes de sécurité adaptées à l'âge.
- Proposer de courtes séances musicales, des berceuses et des contenus éducatifs liés à la culture et à la nature sénégalaises.

## Gates de validation avant diffusion

- [ ] `npm ci` puis `npm run typecheck` réussis.
- [ ] Export Android Expo réussi sur la version du projet.
- [ ] Tests manuels sur un téléphone Android d'entrée de gamme et sur petit écran.
- [ ] TalkBack, tailles de texte, cibles tactiles et zones de sécurité vérifiés.
- [ ] Aucun lien cassé, aucune permission injustifiée, aucun secret dans le dépôt.
- [ ] Politique de confidentialité publiée et vérifiée.
- [ ] Classification d'âge, formulaire Data safety, questionnaire IARC et politique Google Play Families revus avant soumission.
- [ ] Fichiers audio associés aux bonnes fiches, droits vérifiés et wolof relu par un locuteur compétent.
- [ ] APK/AAB signé et installation propre testée avant d'annoncer une version prête.

## Références officielles consultées

- Google Play Families Policy Requirements : https://support.google.com/googleplay/android-developer/answer/9893335
- Documentation Expo Audio : https://docs.expo.dev/versions/latest/sdk/audio/

## Limites de cette feuille de route

Cette feuille de route définit des décisions et critères d'acceptation ; elle ne certifie pas que la conformité légale, l'accessibilité, la lecture audio, les tests sur appareils physiques ou la publication Play Store sont déjà terminés. Toute modification du code doit être vérifiée par CI et test réel avant livraison.
