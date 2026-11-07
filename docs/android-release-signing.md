# Signature de production Android — Niani Kids

La version publique distribuée depuis nianikids.com doit être signée avec un keystore privé stable. Ne jamais utiliser la signature debug de Gradle pour la version publique.

## 1. Créer le keystore (une seule fois)

Sur une machine de confiance avec Java/keytool :

```bash
keytool -genkeypair -v \
  -keystore niani-kids-release.jks \
  -alias nianikids \
  -keyalg RSA -keysize 4096 -validity 10000
```

Conserver le fichier `niani-kids-release.jks` et les mots de passe dans un gestionnaire sécurisé et faire une sauvegarde hors ligne. La perte du keystore empêchera de signer les mises à jour compatibles avec cette installation.

## 2. Préparer l'encodage Base64

Linux :
```bash
base64 -w 0 niani-kids-release.jks
```

macOS :
```bash
base64 niani-kids-release.jks | tr -d '\n'
```

Copier le résultat directement dans le secret GitHub correspondant. Ne pas l'ajouter au dépôt et ne pas l'envoyer dans une conversation.

## 3. Ajouter les secrets GitHub

Dans le dépôt `vjr221/niani-kids` :
**Settings → Secrets and variables → Actions → New repository secret**

Créer exactement ces quatre secrets :

- `ANDROID_KEYSTORE_BASE64` : contenu Base64 du fichier JKS
- `ANDROID_KEYSTORE_PASSWORD` : mot de passe du keystore
- `ANDROID_KEY_ALIAS` : `nianikids` (ou l'alias réellement choisi)
- `ANDROID_KEY_PASSWORD` : mot de passe de la clé

Ne jamais afficher ni partager les valeurs de ces secrets.

## 4. Construire et publier

Après configuration des secrets, lancer le workflow **Niani Kids Android Release (Local Gradle)** depuis l'onglet Actions, ou pousser une modification prise en charge sur `main`.

Le workflow :
- vérifie TypeScript, le catalogue, les contenus et l'audit Wolof ;
- génère le projet Android et construit `assembleRelease` ;
- vérifie la signature APK avec `apksigner` ;
- publie l'APK et son SHA-256 dans une GitHub Release.

## Important — première signature publique

Les APK v1.1.0 précédents étaient signés avec la clé debug Gradle et sont réservés aux tests. La nouvelle signature privée de production sera différente : pour passer de ces APK de test à la version publique, il faudra désinstaller l'ancienne application puis installer la version v1.2.0. Les mises à jour ultérieures devront conserver le même keystore privé.
