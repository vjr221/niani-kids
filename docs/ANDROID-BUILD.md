# Construire l’APK Android de Niani Kids

## État
Le workflow de qualité vérifie TypeScript et exporte le bundle Android. Le workflow **Android APK (EAS)** déclenche une vraie compilation cloud Expo/EAS, mais nécessite un compte Expo et un secret GitHub.

## Préparation unique
1. Connectez-vous à votre compte Expo : `npx eas-cli@latest login`.
2. Depuis la racine du projet, exécutez `npx eas-cli@latest build:configure` si EAS demande de configurer le projet.
3. Dans GitHub, ouvrez **Settings → Secrets and variables → Actions → New repository secret**.
4. Créez le secret nommé `EAS_TOKEN` avec un jeton d’accès créé depuis votre compte Expo. Ne mettez jamais le jeton dans le code ou dans un fichier du dépôt.

## Lancer la compilation
1. Ouvrez l’onglet **Actions** du dépôt GitHub.
2. Sélectionnez **Niani Kids - Android APK (EAS)**, puis **Run workflow**.
3. Choisissez le profil `preview` pour obtenir un APK installable en test. Le profil `production` produit un Android App Bundle (AAB) destiné à la distribution.
4. Une fois la tâche terminée, ouvrez le lien de build EAS indiqué dans les journaux ou dans le tableau de bord Expo pour télécharger le fichier.

## Contrôles après compilation
- Installer l’APK sur un téléphone Android de test.
- Tester Accueil, Bibliothèque, lecture vocale, favoris, jeux, ateliers, Espace Parents et liens externes.
- Vérifier le comportement hors ligne et la fermeture de la fenêtre de lecture.
- Ne pas distribuer aux familles avant les tests sur appareil, la validation des textes wolof, la vérification de la confidentialité et le contrôle des exigences Google Play Families.

## Important
Ce workflow ne peut pas créer de build tant que le secret `EAS_TOKEN` n’est pas configuré et que le projet n’est pas correctement associé au compte Expo. Il ne simule pas un test sur téléphone physique.
