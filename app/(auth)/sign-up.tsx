import { AuthCard } from '@/components/auth-pages/AuthCard';
import { Header } from '@/components/auth-pages/Header';
import { SignUpForm } from '@/components/auth-pages/SignUpForm';
import { VerifyForm } from '@/components/auth-pages/VerifyForm';
import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

export default function SignUpScreen() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-[#FAF6ED]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6 justify-center"
      >
        <Header
          title={isVerifying ? 'Verify Email' : 'Create account'}
          subtitle={
            isVerifying
              ? `Enter the code sent to ${email}`
              : 'Sign up to start managing your subscriptions'
          }
        />

        <AuthCard>
          {isVerifying ? (
            <VerifyForm />
          ) : (
            <SignUpForm
              onSignUpCreated={(createdEmail) => {
                setEmail(createdEmail);
                setIsVerifying(true);
              }}
            />
          )}
        </AuthCard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}