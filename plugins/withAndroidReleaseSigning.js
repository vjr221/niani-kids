const { withAppBuildGradle } = require("@expo/config-plugins");

/**
 * Applies a stable, private Android release keystore to the Gradle release
 * build. Preview/debug builds remain unchanged when no signing environment
 * is present. The release workflow validates all required secrets first.
 */
module.exports = function withAndroidReleaseSigning(config) {
  return withAppBuildGradle(config, (config) => {
    const contents = config.modResults.contents;
    const keystorePath = process.env.ANDROID_KEYSTORE_PATH;

    if (!keystorePath) {
      return config;
    }

    const required = [
      "ANDROID_KEYSTORE_PASSWORD",
      "ANDROID_KEY_ALIAS",
      "ANDROID_KEY_PASSWORD",
    ];
    const missing = required.filter((name) => !process.env[name]);
    if (missing.length) {
      throw new Error(
        \`Android release signing is incomplete. Missing environment variables: \${missing.join(", ")}\`
      );
    }

    const buildTypesIndex = contents.indexOf("buildTypes {");
    if (buildTypesIndex < 0) {
      throw new Error("Could not locate buildTypes in generated android/app/build.gradle");
    }

    const signingConfig = \`
    signingConfigs {
        release {
            storeFile file(System.getenv("ANDROID_KEYSTORE_PATH"))
            storePassword System.getenv("ANDROID_KEYSTORE_PASSWORD")
            keyAlias System.getenv("ANDROID_KEY_ALIAS")
            keyPassword System.getenv("ANDROID_KEY_PASSWORD")
        }
    }

\`;

    const beforeBuildTypes = contents.slice(0, buildTypesIndex);
    const buildTypesAndAfter = contents.slice(buildTypesIndex);
    const releaseSigning = /(release\s*\{[\s\S]*?signingConfig\s+)signingConfigs\.debug/;
    if (!releaseSigning.test(buildTypesAndAfter)) {
      throw new Error("Could not locate the release build signing configuration");
    }

    const updatedBuildTypes = buildTypesAndAfter.replace(
      releaseSigning,
      "$1signingConfigs.release"
    );
    config.modResults.contents =
      beforeBuildTypes + signingConfig + updatedBuildTypes;
    return config;
  });
};
