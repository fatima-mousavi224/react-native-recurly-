
import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig =>
  ({
    ...config,
    name: config.name || "adrin-mobile-app",
    slug: config.slug || "adrin-mobile-app",
    plugins: [...(config.plugins ?? []), "expo-localization"],
    extra: {
      ...config.extra,
      posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
      posthogHost: process.env.POSTHOG_HOST,
    },
  }) as ExpoConfig;
