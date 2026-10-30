# Niani Kids — mise à jour de l'audit audio (30 octobre 2026)

## Source et périmètre vérifiés
- Archive utilisateur : `Chansons Niani kids.zip` (56 173 915 octets).
- Catalogue paroles utilisateur : `Liste_Niani_Kids_Catalogue_Complet_Chansons_Comptines.docx` (25 versions, avec deux maquettes « Bonjour, bonjour ! »).
- Trois masters M4A transmis séparément et retrouvés dans les fichiers de projet : Bonjour (144,80 s), Bienvenue (60,00 s), NIANI! NIANI! (60,00 s).

## Contrôle technique
- 29 fichiers MP3 extraits ; 28 empreintes SHA-256 uniques.
- Doublon exact : `Les couleurs dansent.mp3` et `Les couleurs dansent (2).mp3`.
- Les 29 MP3 et les trois masters ont été décodés intégralement avec FFmpeg sans erreur.
- MP3 : stéréo, 48 kHz, 192 kbit/s. Masters M4A : stéréo, 48 kHz, codec Opus dans conteneur M4A. Tester le décodage natif sur les versions iOS/Android ciblées ; créer au besoin un dérivé AAC-LC/MP3 en gardant les originaux immuables.

## Comparaison technique non perceptive
Similarité d'enveloppe RMS log, signal mono à 8 kHz, fenêtres de 100 ms, alignement ±10 s. Ces mesures ne prouvent ni identité des fichiers ni correspondance des paroles.
- Master Bonjour ↔ `Bonjour Bonjour Niani kids.mp3` : 0,936, forte proximité de structure ; écouter pour confirmer.
- Master Bonjour ↔ `Bonjour Bonjour Niani (Remix).mp3` : 0,418.
- Master Bienvenue ↔ `Bienvenue chez Niani Kids V2.mp3` : 0,319.
- Master générique ↔ `NIANI! NIANI! — ÑU NGI FII!.mp3` : 0,374.
Les trois M4A restent des références séparées et prioritaires ; aucune association n'est faite par nom seul.

## Transcription limitée
Un actif préexistant du workspace ElevenLabs, `Niani Kids - extrait test 18 secondes`, a livré : « Le rouge est dans la tomate, le jaune brille comme le soleil. Le vert pousse sur les feuilles et chaque couleur nous aime. »
Ce fichier n'a pas été identifié comme l'un des 29 MP3 ou des trois M4A ; ce n'est pas une preuve de transcription d'une chanson du ZIP. La fin diffère du texte du DOCX (« nous émerveille »). Conserver les deux formulations en attente de vérification réelle, sans corriger la source.
Coût réel de cette transcription : 99 crédits. Trois autres essais de transcription ont échoué pour quota insuffisant ; ne pas relancer de jobs facturés sans budget connu.

## Statuts d'approbation
- Vérification de décodage, formats, durées, empreintes, doublon : terminée.
- Écoute perceptive intégrale des 29 MP3 et des 3 M4A : non réalisée.
- Correspondance paroles/audio, qualité artistique, prononciation et conformité 0–6 ans : à valider.
- Wolof : relecture par une personne compétente/native requise.
- Droits sur textes, musique, voix et masters : confirmation requise.
**Aucune piste ne passe à `approved` dans cette mise à jour.**

## Ordre d'intégration
1. Audition comparative et validation éditoriale ; garder les trois masters séparés.
2. Documenter titre exact, langue, paroles vérifiées, durée, SHA-256, source, statut et droits.
3. Tester un dérivé techniquement compatible dans l'application ; intégrer localement uniquement les pistes approuvées.
4. CI : typecheck, validation du registre, bundle Expo, build Android ; tester lecture, pause/reprise, progression, seek, fin, arrière-plan, mode hors ligne et compatibilité iOS/Android.
5. Après validation mobile seulement, publier les mêmes médias approuvés sur WordPress ; contrôler chaque URL d'attachement réelle et le rendu HTML5 depuis un navigateur mobile.
6. Ne pas publier les URLs/IDs d'attachement codés dans des branches de travail tant que le média correspondant n'a pas été vérifié dans WordPress.

Le rapport détaillé et les manifestes CSV/JSON sont conservés dans le dossier d'audit téléchargeable fourni avec cette mise à jour.
