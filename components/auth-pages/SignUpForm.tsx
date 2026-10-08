import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";
import { Input } from "./Input";

interface Props {
  onSignUpCreated: (email: string) => void;
}

export function SignUpForm({ onSignUpCreated }: Props) {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;

    if (!firstName || !email || !password) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      console.log("Attempting sign up for:", email);

      // Pass firstName and lastName to Clerk
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      console.log("Sending email verification code...");

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      onSignUpCreated(email);
    } catch (err: any) {
      console.error("Sign Up Error:", JSON.stringify(err, null, 2));

      const errorMessage =
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        "Failed to sign up. Please try again.";

      Alert.alert("Sign Up Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Input
        label="First Name"
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Input
        label="Last Name"
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />

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

      <Button
        title={loading ? "Creating account..." : "Sign up"}
        onPress={handleSignUp}
      />

      <View className="flex-row justify-center mt-4">
        <Text className="text-xs text-gray-500">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/sign-in")}>
          <Text className="text-xs font-semibold text-[#E07A5F]">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
