import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* 
        Keep <SafeAreaView> to handle screen notches and safe areas, 
        and put p-5 on this inner <View> so the padding actually works!
      */}
      <View className="flex-1 p-5">
        <Text className="text-xl font-bold text-blue-500">
          Welcome to Nativewind!
        </Text>

        <Link href="./onboarding" className="mt-4 rounded bg-purple-300 p-4">
          <Text className="font-semibold text-white">Go to onboarding page</Text>
        </Link>

        <Link href="./(auth)/sign-in" className="mt-4 rounded bg-purple-300 p-4">
          <Text className="font-semibold text-white">Go to sign in page</Text>
        </Link>

        <Link href="./(auth)/sign-up" className="mt-4 rounded bg-purple-300 p-4">
          <Text className="font-semibold text-white">Go to sign up page</Text>
        </Link>

        <Link
          href={{ pathname: "/subscriptions/[id]", params: { id: "clude" } }}
          className="mt-4 font-bold text-primary"
        >
          <Text className="font-bold text-primary">Clude Max Subscription</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}