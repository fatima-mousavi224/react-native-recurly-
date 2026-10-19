import { icons } from "@/constants/icons";
import dayjs from "dayjs";
import clsx from "clsx";
import { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORIES = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Entertainment: "#f5c542",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#e8def8",
  Design: "#b8e8d0",
  Productivity: "#f0c8c8",
  Cloud: "#c8d8f0",
  Music: "#f0d8c8",
  Other: "#d8d8d8",
};

const CATEGORY_ICONS: Record<
  string,
  { iconType: "Ionicons" | "MaterialCommunityIcons" | "FontAwesome"; iconName: string }
> = {
  Entertainment: { iconType: "MaterialCommunityIcons", iconName: "film" },
  "AI Tools": { iconType: "MaterialCommunityIcons", iconName: "robot" },
  "Developer Tools": { iconType: "MaterialCommunityIcons", iconName: "code-braces" },
  Design: { iconType: "MaterialCommunityIcons", iconName: "palette" },
  Productivity: { iconType: "MaterialCommunityIcons", iconName: "check-all" },
  Cloud: { iconType: "MaterialCommunityIcons", iconName: "cloud" },
  Music: { iconType: "MaterialCommunityIcons", iconName: "music-note" },
  Other: { iconType: "MaterialCommunityIcons", iconName: "tag" },
};

interface CreateSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (subscription: Subscription) => void;
}

export default function CreateSubscriptionModal({
  visible,
  onClose,
  onAdd,
}: CreateSubscriptionModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<"Monthly" | "Yearly">("Monthly");
  const [category, setCategory] = useState<string>("");

  const nameError = name.trim().length > 0 ? "" : "Name is required";
  const priceNum = parseFloat(price);
  const priceError =
    price.length === 0
      ? "Price is required"
      : Number.isNaN(priceNum) || priceNum <= 0
        ? "Enter a valid price"
        : "";

  const isValid = nameError === "" && priceError === "" && category !== "";

  const resetForm = useCallback(() => {
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory("");
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const handleSubmit = useCallback(() => {
    if (!isValid) return;

    const now = dayjs();
    const startDate = now.toISOString();
    const renewalDate =
      frequency === "Monthly"
        ? now.add(1, "month").toISOString()
        : now.add(1, "year").toISOString();

    const catIcon = CATEGORY_ICONS[category] ?? CATEGORY_ICONS.Other;
    const subscription: Subscription = {
      id: `sub-${Date.now()}`,
      name: name.trim(),
      price: priceNum,
      frequency,
      category,
      status: "active",
      startDate,
      renewalDate,
      icon: icons.wallet,
      billing: frequency,
      color: CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other,
      iconType: catIcon.iconType,
      iconName: catIcon.iconName,
    };

    onAdd(subscription);
    resetForm();
  }, [name, priceNum, frequency, category, isValid, onAdd, resetForm]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View className="modal-overlay">
        <TouchableOpacity
          className="absolute inset-0"
          activeOpacity={1}
          onPress={handleClose}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <View className="modal-container">
            {/* Header */}
            <View className="modal-header">
              <Text className="modal-title">New Subscription</Text>
              <Pressable onPress={handleClose}>
                <View className="modal-close">
                  <Text className="modal-close-text">✕</Text>
                </View>
              </Pressable>
            </View>

            {/* Body */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="modal-body"
              keyboardShouldPersistTaps="handled"
            >
              {/* Name */}
              <View className="gap-2">
                <Text className="auth-label">Name</Text>
                <TextInput
                  className={clsx("auth-input", {
                    "auth-input-error": nameError,
                  })}
                  placeholder="e.g. Spotify"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
                {nameError ? (
                  <Text className="auth-error">{nameError}</Text>
                ) : null}
              </View>

              {/* Price */}
              <View className="gap-2">
                <Text className="auth-label">Price</Text>
                <TextInput
                  className={clsx("auth-input", {
                    "auth-input-error": priceError,
                  })}
                  placeholder="0.00"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                />
                {priceError ? (
                  <Text className="auth-error">{priceError}</Text>
                ) : null}
              </View>

              {/* Frequency */}
              <View className="gap-2">
                <Text className="auth-label">Frequency</Text>
                <View className="picker-row">
                  {(["Monthly", "Yearly"] as const).map((option) => (
                    <Pressable
                      key={option}
                      onPress={() => setFrequency(option)}
                      className={clsx("picker-option", {
                        "picker-option-active": frequency === option,
                      })}
                    >
                      <Text
                        className={clsx("picker-option-text", {
                          "picker-option-text-active": frequency === option,
                        })}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Category */}
              <View className="gap-2">
                <Text className="auth-label">Category</Text>
                <View className="category-scroll">
                  {CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => setCategory(cat)}
                      className={clsx("category-chip", {
                        "category-chip-active": category === cat,
                      })}
                    >
                      <Text
                        className={clsx("category-chip-text", {
                          "category-chip-text-active": category === cat,
                        })}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {category ? null : (
                  <Text className="auth-error">Select a category</Text>
                )}
              </View>

              {/* Submit */}
              <Pressable
                onPress={handleSubmit}
                className={clsx("auth-button", {
                  "auth-button-disabled": !isValid,
                })}
              >
                <Text className="auth-button-text">Create Subscription</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
