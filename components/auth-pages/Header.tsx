import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: Props) {
  return (
    <View className="items-center mb-6">
      <View className="flex-row items-center justify-center mb-8">
        <View className="w-12 h-12 bg-[#E07A5F] rounded-xl justify-center items-center mr-3">
          <Text className="text-white text-2xl font-bold">R</Text>
        </View>
        <View>
          <Text className="text-xl font-bold text-gray-800">Recurly</Text>
          <Text className="text-[10px] font-semibold text-gray-500 tracking-widest">
            SMART BILLING
          </Text>
        </View>
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-2">{title}</Text>
      <Text className="text-sm text-gray-500 text-center px-4">{subtitle}</Text>
    </View>
  );
}