# Niani Kids — checklist de publication mobile

## Code et intégration
- [ ] Branche relue et différence comparée à `main`.
- [ ] `npm ci` réussi sur Node compatible avec le projet.
- [ ] `npm run typecheck` réussi.
- [ ] Export Android Expo réussi avec les dépendances verrouillées.
- [ ] Icône de l’application, icône adaptative Android et splash screen utilisent le logo officiel ; rendu visuel vérifié sur appareil réel.
- [ ] Aucun secret, jeton, fichier utilisateur ou asset non autorisé dans le commit.
- [ ] État CI vérifié sur le SHA exact à livrer.

## Parcours fonctionnels
- [ ] Premier lancement, changement FR/Wolof, redémarrage et persistance.
- [ ] Recherche, filtres, favoris, suppression d'un favori et état vide.
- [ ] Jeux : mauvaise réponse sans récompense, bonne réponse récompensée une seule fois, passage à la question suivante.
- [ ] Ateliers et contes : navigation, lecture, arrêt de la synthèse vocale si l'utilisateur quitte l'écran.
- [ ] Liens externes derrière le parcours de confirmation parent.
- [ ] Erreurs de stockage et d'ouverture de lien gérées sans crash.

## Audio
- [ ] Master exact identifié et empreinte enregistrée.
- [ ] Titre, durée et langue vérifiés.
- [ ] Paroles/transcription relues ; wolof validé par une personne compétente.
- [ ] Droits d'utilisation confirmés.
- [ ] Lecture/pause, progression, fin, erreur, interruption et sortie de l'écran testées.
- [ ] Aucun titre ne prétend être chanté si seule la synthèse vocale du texte est disponible.

## Accessibilité et sécurité enfants
- [ ] TalkBack et tailles de texte agrandies testés.
- [ ] Cibles tactiles adaptées, libellés accessibles, contraste suffisant.
- [ ] Pas de publicité ciblée, chat public, collecte inutile, achats enfant ou mécanisme de pression.
- [ ] Permissions Android minimales et justifiées.
- [ ] Politique de confidentialité accessible, coordonnées de contact présentes.
- [ ] Politique Google Play Families, classification d'âge, Data safety et IARC vérifiés avant soumission.

## Livraison
- [ ] Installation propre sur au moins un appareil Android physique.
- [ ] APK/AAB signé via le pipeline attendu.
- [ ] Version, numéro de build et SHA publiés avec le lien exact.
- [ ] PR revue et fusion effectuée explicitement ; ne pas assimiler l'ouverture d'une PR à une fusion.
