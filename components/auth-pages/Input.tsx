import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, secureTextEntry, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = secureTextEntry;

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-sm font-sans-medium text-[#3B1F16] mb-1">
          {label}
        </Text>
      )}

      <View className="relative justify-center">
        <TextInput
          className={`w-full h-12 pl-4 pr-12 rounded-xl bg-white border ${
            error ? "border-red-500" : "border-gray-200"
          } text-[#3B1F16] font-sans-regular text-base`}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPasswordField && !showPassword}
          {...props}
        />

        {isPasswordField && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPassword((prev) => !prev)}
            style={{ position: 'absolute', right: 12, top: 12, zIndex: 10 }}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#3B1F16"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-xs text-red-500 mt-1 font-sans-regular">
          {error}
        </Text>
      )}
    </View>
  );
}