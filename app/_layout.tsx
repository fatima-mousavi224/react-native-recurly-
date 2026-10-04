
import "@/global.css";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

// Prevent Expo from hiding the splash screen
// before the app and fonts are ready.
SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore if the splash screen has already been prevented.
});

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

  // Keep the splash screen visible while fonts are loading.
  if (!fontLoaded && !fontError) {
    return null;
  }

  // If fonts fail, log the error and continue
  // with the system/fallback font.
  if (fontError) {
    console.error("Failed to load fonts:", fontError);
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

