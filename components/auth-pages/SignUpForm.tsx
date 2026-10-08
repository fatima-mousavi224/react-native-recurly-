import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Input } from './Input';
import { Button } from './Button';

interface Props {
  onSignUpCreated: (email: string) => void;
}

export function SignUpForm({ onSignUpCreated }: Props) {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) {
      Alert.alert('Please wait', 'Clerk is still loading.');
      return;
    }

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting sign up for:', email);

      // Create sign-up attempt with Clerk
      await signUp.create({
        emailAddress: email,
        password,
      });

      console.log('Sending email verification code...');

      // Prepare email code verification
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      console.log('Verification email sent successfully.');
      onSignUpCreated(email);
    } catch (err: any) {
      console.error('Sign Up Error:', JSON.stringify(err, null, 2));

      const errorMessage =
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        'Failed to sign up. Please try again.';

      Alert.alert('Sign Up Failed', errorMessage);
    } finally {
      setLoading(false);
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
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={loading ? 'Creating account...' : 'Sign up'}
        onPress={handleSignUp}
      />

      <View className="flex-row justify-center mt-4">
        <Text className="text-xs text-gray-500">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/sign-in')}>
          <Text className="text-xs font-semibold text-[#E07A5F]">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}