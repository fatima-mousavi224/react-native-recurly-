import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Header } from './Header';
import { AuthCard } from './AuthCard';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { VerifyForm } from './VerifyForm';

export default function AuthScreen() {
  const [step, setStep] = useState<'signin' | 'signup' | 'verify'>('signin');
  const [userEmail, setUserEmail] = useState('');

  const handleSignUpCreated = (email: string) => {
    setUserEmail(email);
    setStep('verify');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF6ED]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6 justify-center"
      >
        <Header
          title={
            step === 'verify'
              ? 'Verify Email'
              : step === 'signin'
              ? 'Welcome back'
              : 'Create account'
          }
          subtitle={
            step === 'verify'
              ? `Enter the code sent to ${userEmail}`
              : step === 'signin'
              ? 'Sign in to continue managing your subscriptions'
              : 'Sign up to start managing your subscriptions'
          }
        />

        <AuthCard>
          {step === 'signin' && (
            <SignInForm onNavigateToSignUp={() => setStep('signup')} />
          )}
          {step === 'signup' && (
            <SignUpForm
              onNavigateToSignIn={() => setStep('signin')}
              onSignUpCreated={handleSignUpCreated}
            />
          )}
          {step === 'verify' && <VerifyForm />}
        </AuthCard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}