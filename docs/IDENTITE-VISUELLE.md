# Niani Kids — Bible d'identité visuelle
Version : 1.0 — 21 octobre 2026

Ce document est la référence commune pour les illustrations, vidéos, miniatures, supports éducatifs, site web et application Niani Kids. En cas de différence entre une nouvelle image générée et les modèles officiels, les modèles officiels priment.

## 1. Règle centrale
Les personnages doivent rester immédiatement reconnaissables d'une image à l'autre. Ne pas réinventer leur visage, leur coiffure, leur silhouette, leur tenue principale, leur âge apparent ou leurs couleurs. Une image générée est une référence d'ambiance ou de pose, pas une nouvelle définition du personnage, sauf validation explicite.

## 2. Personnages canoniques

### Samba
- Garçon noir sénégalais, jeune enfant, cheveux courts et bouclés.
- Couleur signature : bleu.
- Tenue de référence : sweat à capuche bleu, pantalon/short bleu selon le modèle officiel validé, chaussures bleues et blanches.
- Expression : curieuse, souriante, dynamique et bienveillante.
- Ne pas lui ajouter de casquette, de longues tresses ou une tenue jaune/rouge.
- Le logo imprimé sur le sweat doit reprendre le visuel officiel fourni ; ne pas le remplacer automatiquement par une carte de l'Afrique ou un emblème inventé.

### Awa
- Fille noire sénégalaise, jeune enfant.
- Cheveux : longues tresses avec perles colorées visibles.
- Signature vestimentaire : tenue d'inspiration sénégalaise/africaine, motifs colorés, sans perdre la silhouette de référence.
- Palette dominante : jaune, orange, vert et touches de couleurs vives.
- Expression : douce, joyeuse, expressive et confiante.
- Ne pas raccourcir ses tresses ni supprimer les perles.

### Bobo
- Garçon noir sénégalais, jeune enfant.
- Élément distinctif obligatoire : casquette rouge portée à l'envers.
- Tenue principale : tee-shirt jaune, bas bleu/denim et chaussures rouges et blanches selon le modèle validé.
- Expression : espiègle, énergique et amicale.
- Le short vert et le tee-shirt avec étoile verte vus dans certaines scènes sont des variantes d'ambiance non canoniques tant qu'elles ne sont pas validées.
- Ne jamais lui donner les cheveux bouclés volumineux de Samba ni les tresses d'Awa.

### Le Baobab
- Baobab anthropomorphe souriant, accueillant et rassurant.
- Tronc brun chaud, feuillage vert, petites fleurs/plantes possibles.
- Visage intégré au tronc, grands yeux expressifs et bras en branches.
- Il est un guide protecteur et merveilleux, jamais effrayant.
- Garder une forme d'arbre immédiatement reconnaissable ; éviter les changements majeurs de visage, de texture ou de proportions.

## 3. Palette et direction artistique
- Bleu Samba : couleur identitaire principale, lumineuse et chaleureuse.
- Jaune Bobo : jaune soleil, associé au rouge de sa casquette.
- Awa : palette textile africaine colorée, équilibrée par des tons chauds.
- Baobab : bruns naturels, verts feuillus et accents floraux.
- Univers : Sénégal chaleureux, lumière dorée, végétation tropicale, artisanat et motifs locaux utilisés avec goût.
- Style visuel : animation 3D familiale haut de gamme, formes douces, expressions lisibles, éclairage cinématographique chaleureux.
- Contraste suffisant pour les petits écrans ; éviter la saturation excessive qui rend les visages ou les vêtements illisibles.

## 4. Images de référence : hiérarchie
1. **Référence canonique** : fichiers individuels nommés `Samba_portrait_et_nom.png`, `Samba_vues_corps_entier.png`, `Samba_expressions.png`, et équivalents Awa/Bobo dans `assets/`.
2. **Référence de scène** : images récentes montrant les personnages dans le village, avec le Baobab, en train de danser, chanter, explorer ou jouer. Elles servent à l'ambiance, aux poses, à la lumière et aux décors.
3. **Exploration** : images dont la tenue ou les traits divergent des références canoniques. Les garder comme variantes potentielles, sans les utiliser pour redéfinir le personnage.

Les images de groupe récentes sont adaptées aux bannières, aux couvertures et aux scènes collectives. Pour les portraits officiels, utiliser les fichiers individuels nets. Ne pas utiliser une capture d'écran d'une planche de vignettes comme source graphique.

## 5. Consignes pour les générateurs d'images et de vidéos
Toujours joindre les références canoniques pertinentes (portrait + corps entier, si possible). Ajouter ensuite la référence de scène uniquement pour la pose ou l'ambiance.

Prompt de cohérence à inclure :
> Preserve the exact official Niani Kids character designs from the supplied reference images. Keep each character's face, skin tone, age, body proportions, hairstyle, signature outfit, colors and accessories consistent. Samba wears blue and has short curly hair. Awa has long braids decorated with colorful beads and a Senegalese-inspired outfit. Bobo wears a red cap backwards and a yellow T-shirt. The Baobab is the same friendly anthropomorphic baobab tree. Do not redesign, swap outfits, change hairstyles, add accessories, or merge character traits. Use the scene reference only for composition, action, lighting and background. If a detail conflicts, prioritize the official character references.

### À éviter
- Personnages qui changent de visage, de teint, d'âge ou de corpulence entre les plans.
- Couleurs signatures permutées entre Samba, Awa et Bobo.
- Logos illisibles ou remplacés par du texte inventé.
- Doigts, mains, chaussures, perles, casquettes ou vêtements déformés.
- Texte généré dans l'image : ajouter les titres et logos après génération dans un outil de mise en page.
- Arrière-plans trop chargés qui concurrencent les personnages.

## 6. Contrôle qualité avant publication
- [ ] Les quatre personnages correspondent aux références canoniques.
- [ ] Les couleurs et accessoires distinctifs sont respectés.
- [ ] Les vêtements ne changent pas d'un plan au suivant sans raison narrative validée.
- [ ] Le logo Niani Kids est la version officielle, net et non déformé.
- [ ] Les mains, yeux, dents, chaussures et motifs sont vérifiés à taille réelle.
- [ ] L'image reste lisible sur téléphone et adaptée aux enfants de 0 à 6 ans.
- [ ] Toute nouvelle tenue ou modification de design est identifiée comme variante et validée avant de devenir officielle.

## 7. Organisation recommandée des fichiers
Conserver les références canoniques dans `assets/`. Nommer les nouvelles images de manière descriptive, par exemple :
- `Samba_scene_danse_v01.png`
- `Awa_scene_chant_v01.png`
- `Bobo_scene_jeu_v01.png`
- `Baobab_scene_accueil_v01.png`
- `Groupe_NianiKids_banniere_v01.png`

Ne jamais écraser un fichier de référence officiel avec une génération plus récente. Conserver les variantes et versions datées séparément.
