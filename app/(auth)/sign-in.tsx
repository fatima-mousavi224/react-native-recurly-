import { AuthCard } from '@/components/auth-pages/AuthCard';
import { Header } from '@/components/auth-pages/Header';
import { SignInForm } from '@/components/auth-pages/SignInForm';
import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

export default function SignInScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAF6ED]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6 justify-center"
      >
        <Header
          title="Welcome back"
          subtitle="Sign in to continue managing your subscriptions"
        />
        <AuthCard>
          <SignInForm/>
        </AuthCard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}