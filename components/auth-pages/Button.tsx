import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#E07A5F] rounded-xl py-3.5 items-center mt-3 active:opacity-90"
    >
      <Text className="text-white text-base font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}