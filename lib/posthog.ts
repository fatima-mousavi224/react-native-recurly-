import Constants from "expo-constants";
import PostHog from "posthog-react-native";

const extra = Constants.expoConfig?.extra;
const projectToken = extra?.posthogProjectToken as string | undefined;
const host = extra?.posthogHost as string | undefined;

const isPostHogConfigured = Boolean(projectToken?.startsWith("phc_") && host);

if (__DEV__ && !projectToken?.startsWith("phc_")) {
  console.warn(
    "POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once POSTHOG_PROJECT_TOKEN is configured",
  );
}

if (__DEV__ && !host) {
  console.warn(
    "POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once POSTHOG_HOST is configured",
  );
}

export const posthog = isPostHogConfigured
  ? new PostHog(projectToken!, {
      host: host!,
      logs: {
        serviceName: "adrin-mobile-app",
        environment: __DEV__ ? "development" : "production",
        serviceVersion: Constants.expoConfig?.version,
      },
      captureAppLifecycleEvents: true,
      errorTracking: {
        autocapture: {
          uncaughtExceptions: true,
          unhandledRejections: true,
          console: [],
        },
      },
    })
  : null;

export const posthogLogger = {
  info: (message: string, attributes: Record<string, string>) => {
    posthog?.logger.info(message, attributes);
  },
};
