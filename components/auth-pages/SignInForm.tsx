import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";
import { Input } from "./Input";

export function SignInForm() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!isLoaded) return;
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors?.[0]?.message || "Sign in failed");
    }
  };

  return (
    <View>
      <Input
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Password"
        placeholder="Enter your password (min 8 chars)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign in" onPress={handleSignIn} />

      <View className="flex-row justify-center mt-4">
        <Text className="text-xs text-gray-500">New to Recurly? </Text>
        <TouchableOpacity onPress={() => router.push("/sign-up")}>
          <Text className="text-xs font-semibold text-[#E07A5F]">
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
