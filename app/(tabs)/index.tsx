import CreateSubscriptionModal from "@/components/CreateSubscriptionModal";
import ListHeading from "@/components/ListHeading";
import SubscriptionsCard from "@/components/SubscriptionsCard";
import UpcomingSubscriptionsCard from "@/components/UpcomingSubscriptionsCard";
import { useSubscriptions } from "@/context/SubscriptionContext";
import {
  HOME_BALANCE,
  HOME_DEMO_NOTICE,
  UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import "@/global.css";
import { posthog, posthogLogger } from "@/lib/posthog";
import { formatCurrency } from "@/lib/utils";

import { useUser } from "@clerk/clerk-expo";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { subscriptions, addSubscription } = useSubscriptions();
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const upcomingSubscriptions = UPCOMING_SUBSCRIPTIONS.map((subscription) => ({
    ...subscription,
    daysLeft: Math.max(0, dayjs(subscription.renewalDate).diff(dayjs(), "day")),
  }));

  // Safely extract name and profile image
  const userName =
    isLoaded && user
      ? user.firstName ||
        user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
        "User"
      : "User";

  const userAvatar =
    isLoaded && user?.imageUrl ? { uri: user.imageUrl } : images.avatar;

  const openSubscriptions = (source: "upcoming" | "all") => {
    posthog?.capture("subscription_list_opened", { source });
    posthogLogger.info("subscription list opened", {
      source,
    });
    router.push("/subscriptions");
  };

  const handleAddSubscription = useCallback(
    (subscription: Subscription) => {
      addSubscription(subscription);
      setIsModalVisible(false);
    },
    [addSubscription],
  );

  const toggleSubscriptionDetails = (
    subscription: Subscription,
  ) => {
    const expanded = expandedSubscriptionId !== subscription.id;

    posthog?.capture("subscription_details_toggled", {
      subscription_id: subscription.id,
      subscription_category: subscription.category ?? "",
      subscription_status: subscription.status ?? "",
      expanded,
    });
    setExpandedSubscriptionId(expanded ? subscription.id : null);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <View className="mb-10">
          <FlatList
            ListHeaderComponent={() => (
              <>
                {/* Header */}
                <View className="home-header">
                  <View className="home-user">
                    <Image
                      source={userAvatar}
                      className="home-avatar"
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 8,
                      }}
                    />

                    <Text className="home-user-name text-base font-sans-bold">
                      {userName}
                    </Text>
                  </View>

                  <Pressable onPress={() => setIsModalVisible(true)}>
                    <Image
                      source={icons.add}
                      className="home-add-icon rounded-full"
                      style={{
                        height: 32,
                        width: 32,
                      }}
                    />
                  </Pressable>
                </View>

                <Text className="my-2 text-sm text-primary">
                  {HOME_DEMO_NOTICE}
                </Text>

                {/* Balance Card */}
                <View className="home-balance-card">
                  <Text className="home-balance-label text-[#3B1F16]">
                    Balance
                  </Text>

                  <View className="home-balance-row">
                    <Text className="home-balance-amount text-[#3B1F16]">
                      {formatCurrency(HOME_BALANCE.amount)}
                    </Text>

                    <Text className="home-balance-date text-[#3B1F16]">
                      {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                    </Text>
                  </View>
                </View>

                {/* Upcoming Subscriptions */}
                <View className="mb-5">
                  <ListHeading
                    title="Upcoming"
                    onPress={() => openSubscriptions("upcoming")}
                  />

                  <FlatList
                    data={upcomingSubscriptions}
                    renderItem={({ item }) => (
                      <UpcomingSubscriptionsCard {...item} />
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={
                      <Text className="home-empty-state">
                        No upcoming subscriptions found.
                      </Text>
                    }
                  />
                </View>

                {/* All Subscriptions */}
                <ListHeading
                  title="All Subscriptions"
                  onPress={() => openSubscriptions("all")}
                />
              </>
            )}
            data={subscriptions}
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
              <Text className="home-empty-state">No Subscriptions Yet.</Text>
            }
            contentContainerClassName="pb-30"
          />
        </View>
      </ScrollView>

      <CreateSubscriptionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddSubscription}
      />
    </SafeAreaView>
  );
}
