import "@/global.css";

import { useFonts } from "expo-font";
import {
  SplashScreen,
  Stack,
  usePathname,
  useRouter,
  useSegments,
} from "expo-router";
import { useEffect, useRef } from "react";
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { PostHogProvider, usePostHog } from "posthog-react-native";
import { posthog } from "@/lib/posthog";
import { tokenCache } from "../utils/cache";

// Fallback to empty string if env variable is missing to prevent M_ID undefined error
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

SplashScreen.preventAutoHideAsync().catch(() => {});

function PostHogIdentity() {
  const posthogClient = usePostHog();
  const { isLoaded, user } = useUser();
  const previousUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const userId = user?.id ?? null;

    if (userId && userId !== previousUserId.current) {
      if (previousUserId.current) {
        posthogClient.reset();
      }

      const personProperties: Record<string, string> = {};
      const email = user?.primaryEmailAddress?.emailAddress;

      if (email) personProperties.email = email;
      if (user?.firstName) personProperties.first_name = user.firstName;
      if (user?.lastName) personProperties.last_name = user.lastName;

      posthogClient.identify(userId, { $set: personProperties });
    } else if (!userId && previousUserId.current) {
      posthogClient.reset();
    }

    previousUserId.current = userId;
  }, [
    isLoaded,
    posthogClient,
    user?.firstName,
    user?.id,
    user?.lastName,
    user?.primaryEmailAddress?.emailAddress,
  ]);

  return null;
}

function PostHogScreenTracking() {
  const posthogClient = usePostHog();
  const pathname = usePathname();

  useEffect(() => {
    posthogClient.screen(pathname);
  }, [pathname, posthogClient]);

  return null;
}

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthGroup) {
      router.replace("/sign-in");
    } else if (isSignedIn && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [isSignedIn, isLoaded, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    "sans-regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "sans-medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "sans-semibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "sans-bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "sans-light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "sans-extrabold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  const app = <InitialLayout />;

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {posthog ? (
        <PostHogProvider client={posthog}>
          <PostHogIdentity />
          <PostHogScreenTracking />
          {app}
        </PostHogProvider>
      ) : (
        app
      )}
    </ClerkProvider>
  );
}