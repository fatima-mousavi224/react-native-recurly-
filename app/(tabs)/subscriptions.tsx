import SubscriptionsCard from "@/components/SubscriptionsCard";
import { useSubscriptions } from "@/context/SubscriptionContext";
import "@/global.css";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Subscriptions() {
  const { subscriptions } = useSubscriptions();
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSubscriptionDetails = useCallback(
    (subscription: Subscription) => {
      const expanded = expandedSubscriptionId !== subscription.id;
      setExpandedSubscriptionId(expanded ? subscription.id : null);
    },
    [expandedSubscriptionId],
  );

  const filteredSubscriptions = useMemo(() => {
    if (!searchQuery.trim()) return subscriptions;
    const query = searchQuery.toLowerCase();
    return subscriptions.filter(
      (sub) =>
        sub.name.toLowerCase().includes(query) ||
        (sub.category?.toLowerCase().includes(query) ?? false),
    );
  }, [subscriptions, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View style={{ padding: 20 }} className="flex-1">
      <Text className="sub-title text-2xl pb-6">Subscriptions</Text>
        <View className="mb-4 relative">
          <Ionicons
            name="search"
            size={18}
            color="#9CA3AF"
            style={{ position: "absolute", left: 12, top: 10, zIndex: 1 }}
          />
          <TextInput
            className="rounded-2xl border border-border bg-background pl-8 py-2 px-4 text-base font-sans-medium text-primary"
            placeholder="Search subscriptions..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <FlatList
          data={filteredSubscriptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubscriptionsCard
              {...item}
              expanded={expandedSubscriptionId === item.id}
              onPress={() => toggleSubscriptionDetails(item)}
            />
          )}
          extraData={expandedSubscriptionId}
          ItemSeparatorComponent={() => <View className="h-4" />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="home-empty-state">
              {searchQuery.trim()
                ? "No matching subscriptions found."
                : "No Subscriptions Yet."}
            </Text>
          }
          contentContainerClassName="pb-30"
        />
      </View>
    </SafeAreaView>
  );
}
