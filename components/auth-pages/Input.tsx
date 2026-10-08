import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  label: string;
}

export function Input({ label, ...props }: Props) {
  return (
    <View className="mb-3">
      <Text className="text-sm font-semibold text-gray-700 mb-2">{label}</Text>
      <TextInput
        className="bg-[#FFFDF9] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm text-gray-900"
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </View>
  );
}