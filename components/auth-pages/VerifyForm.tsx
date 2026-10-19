import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { posthog, posthogLogger } from '@/lib/posthog';
import { Input } from './Input';
import { Button } from './Button';

export function VerifyForm() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!isLoaded) return;

    if (!code) {
      Alert.alert('Error', 'Please enter the verification code.');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting email verification with code...');

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        console.log('Verification successful! Setting active session...');
        await setActive({ session: completeSignUp.createdSessionId });
        posthog?.capture('sign_up_completed');
        posthogLogger.info('authentication completed', {
          flow: 'sign_up',
        });
      } else {
        console.log('Verification status incomplete:', completeSignUp);
        Alert.alert('Error', 'Verification status incomplete. Please try again.');
      }
    } catch (err: any) {
      console.error('Verification Error:', JSON.stringify({ message: err?.message, code: err?.code, errors: err?.errors }, null, 2));

      const errorMessage =
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        'Invalid code. Please check your email and try again.';

      Alert.alert('Verification Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Input
        label="Verification Code"
        placeholder="Enter 6-digit code"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
      />

      <Button
        title={loading ? 'Verifying...' : 'Verify Email'}
        onPress={handleVerify}
      />
    </View>
  );
}