# Niani Kids — procédure d'identification et de validation des audios

## Objectif
Associer chaque master ElevenLabs à la bonne fiche sans deviner à partir du nom de fichier, puis documenter son état éditorial.

## Fiche de contrôle par fichier

Pour chaque MP3, consigner :
- Nom d'origine et empreinte SHA-256 ;
- durée exacte, format, fréquence et canaux ;
- titre proposé et identifiant stable de la fiche ;
- langue réellement chantée/parlée (FR, WO, mixte ou autre) ;
- transcription vérifiée par écoute, y compris les répétitions et fins coupées ;
- voix, intelligibilité, rythme, volume/crêtes, souffle, clics et artefacts ;
- contenu approprié à l'âge 0–6 ans et prononciation ;
- droits sur le texte, la musique, la voix et les conditions de génération ;
- décision : rejeté, à corriger, à réécouter, en relecture linguistique, approuvé ;
- personne et date de validation.

## Écoute et transcription

1. Écouter l'intégralité du fichier avant de proposer un titre.
2. Utiliser une transcription automatique comme aide uniquement ; elle ne valide ni la langue, ni les paroles, ni les droits.
3. Comparer la transcription avec le texte du nœud ElevenLabs concerné, si disponible.
4. Réécouter le début et la fin pour vérifier les attaques, les coupures, les silences et les répétitions.
5. Faire relire le wolof par un locuteur compétent ; ne pas publier une traduction automatique comme texte validé.
6. Ne relier le master au catalogue qu'après approbation éditoriale et vérification des droits.

## Contrôle technique

- Conserver un master original immuable et travailler sur une copie pour toute normalisation.
- Calculer SHA-256 afin d'identifier les doublons exacts ; des durées identiques ne prouvent pas que deux fichiers sont identiques.
- Vérifier la durée réelle par analyse de fichier, pas seulement la durée affichée dans l'interface.
- Éviter toute normalisation destructrice avant validation. Conserver les métadonnées de contrôle dans un manifeste, pas dans des suppositions.
- Un statut « génération terminée » dans ElevenLabs ne signifie pas que le fichier a été écouté ou approuvé.

## Statuts d'affichage dans l'application

- `needs-identification` : aucun titre/langue/master confirmé ; pas de lecture publique.
- `needs-editorial-review` : identité connue, mais écoute, langue, droits ou conformité non validés ; pas de lecture publique.
- `approved` : fichier exact lié à une fiche, droits confirmés, langue relue, contrôles éditoriaux réussis.

Ne jamais montrer un bouton de lecture fonctionnel pour une piste dont le master n'est pas réellement embarqué ou disponible via une URL contrôlée et testée.
