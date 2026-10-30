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
- Mesures FFmpeg : les MP3 ont un niveau moyen de -18,3 à -14,0 dBFS et des crêtes de -0,7 à 0,0 dBFS ; 13 pistes atteignent -0,1 dBFS ou plus. Les trois masters ont des niveaux moyens de -18,0 à -16,5 dBFS et des crêtes de -0,2 à 0,0 dBFS. Ce sont des alertes de mixage à écouter, pas une preuve de distorsion.
- Détection de silence terminal : aucun silence final ≥1 s sous -45 dBFS sur les 29 MP3 et les 3 masters. Les silences internes ne sont pas considérés comme des défauts par défaut.

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

## Dérivés AAC-LC pour essai du lecteur mobile

Trois copies de test ont été créées à partir des masters Opus, sans remplacer les sources :

| Master source | Dérivé AAC-LC | Durée dérivée | SHA-256 dérivé |
|---|---|---:|---|
| `01 Bonjour Bonjour les amis.m4a` | `01_Bonjour_Bonjour_les_amis_AAC-LC.m4a` | 144,813 s | `6c9e262898bc52642e469a35febb074f1fde97c817ef33f371886e28491406c9` |
| `02 — Bienvenue chez Niani Kids.m4a` | `02_Bienvenue_chez_Niani_Kids_AAC-LC.m4a` | 60,013 s | `7e577f7d9ee82bfeb1ff71762161a7a9fbf80e0e376d6842829e19ac22677b96` |
| `03 - NIANI! NIANI! — ÑU NGI FII!.m4a` | `03_NIANI_NIANI_NU_NGI_FII_AAC-LC.m4a` | 60,013 s | `ec89ccc9799641c180c3768f9be3c2a04a883658f1b471244d80db87cfd8b99c` |

Encodage AAC-LC, stéréo, 48 kHz, cible 192 kbit/s avec métadonnées conservées et `faststart`. Les trois dérivés ont été décodés par FFmpeg sans erreur. Le test d'écoute dans l'application sur des appareils réels Android/iOS reste à faire. Les fichiers dérivés ne sont pas des masters éditoriaux validés.

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
