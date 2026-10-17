# Inventaire technique des MP3 reçus — Niani Kids

Contrôle local effectué le 17 octobre 2026. Les noms sont ceux des fichiers reçus dans la conversation ; ils ne donnent aucune indication fiable sur le titre ou la langue du morceau.

| Fichier | Durée (s) | Taille (octets) | SHA-256 |
|---|---:|---:|---|
| `content.mp3` | 75.024 | 1818322 | `1ca13bbda784a6ba9119c95657333f2e4ad5490ab1be495971efc2b57ae1a0db` |
| `content (1).mp3` | 75.024 | 1818322 | `e79f9440852652fcfe77715c5a880a920c135c5aa67fe9446931fbd7d4bacecb` |
| `content (2).mp3` | 75.024 | 1818322 | `1ca13bbda784a6ba9119c95657333f2e4ad5490ab1be495971efc2b57ae1a0db` |
| `content (3).mp3` | 81.024 | 1962322 | `88335256d6eb3d90308f4926d582f71b54e1d7ffe753a722529b681ae0f50b0f` |
| `content (4).mp3` | 75.024 | 1818322 | `c5cee04a4da25d33de0eba579fbe17261de26c24be62c44ca67cac7813bfb646` |
| `content (5).mp3` | 75.024 | 1818322 | `c5cee04a4da25d33de0eba579fbe17261de26c24be62c44ca67cac7813bfb646` |
| `content (6).mp3` | 79.032 | 1914514 | `1fc6dff61752e2b1af8a9811462edb61d7fc474108f3eee2fef0a51f7958d9f0` |
| `content (7).mp3` | 75.024 | 1818322 | `9eaf7e1768ebdc848e6b0c02689ad2067e6595cffaec4a0f5b1ee4a1b221c55f` |
| `content (8).mp3` | 75.024 | 1818322 | `9eaf7e1768ebdc848e6b0c02689ad2067e6595cffaec4a0f5b1ee4a1b221c55f` |
| `content (9).mp3` | 75.024 | 1818322 | `9eaf7e1768ebdc848e6b0c02689ad2067e6595cffaec4a0f5b1ee4a1b221c55f` |

## Doublons exacts confirmés par SHA-256

- `content.mp3` et `content (2).mp3` sont identiques octet pour octet.
- `content (4).mp3` et `content (5).mp3` sont identiques octet pour octet.
- `content (7).mp3`, `content (8).mp3` et `content (9).mp3` sont identiques octet pour octet.

Il y a donc **7 masters distincts au maximum parmi les 10 fichiers reçus** (3 fichiers redondants au-delà de ces exemplaires uniques). Les fichiers restants peuvent encore être des variantes musicales proches sans être des doublons binaires : une écoute comparative reste nécessaire.

## Ce que ces données prouvent — et ne prouvent pas

- Prouvent : durée de conteneur, taille et identité binaire exacte des fichiers.
- Ne prouvent pas : titre, langue, contenu des paroles, qualité de mixage, conformité aux paroles du nœud, droits d'utilisation, ni approbation éditoriale.
- Ne pas supprimer les copies originales de l'espace utilisateur ; cet inventaire sert à éviter d'intégrer plusieurs fois les mêmes données dans l'application.
- Aucun de ces fichiers n'est encore associé automatiquement à une fiche publique dans `src/audioCatalog.ts`.

## Prochaine étape

Écouter/transcrire les sept fichiers distincts, comparer aux nœuds ElevenLabs, confirmer la langue et les droits, puis mettre à jour le manifeste audio seulement après validation.
