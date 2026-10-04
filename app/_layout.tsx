import "@/global.css";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
   'sans-regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
   'sans-medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'sans-semibold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'sans-bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'sans-light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
    'sans-extrabold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
  })

  useEffect(() => {
    if(fontLoaded || fontError) {
      SplashScreen.hideAsync().catch(console.warn)
    }
  }, [fontLoaded, fontError])

  if(!fontLoaded && !fontError) return null;

  if (fontError) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-6">
        <Text accessibilityRole="alert" className="text-center text-base text-primary">
          Unable to load the app fonts. Please close and reopen the app to try again.
        </Text>
      </View>
    );
  }


  return (
    <Stack screenOptions={{ headerShown: false }}/>
  )
}
