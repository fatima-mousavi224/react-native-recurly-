import React from 'react';
import { View } from 'react-native';

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <View className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#EFE6D5] shadow-sm">
      {children}
    </View>
  );
}