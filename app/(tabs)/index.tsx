
import ListHeading from "@/components/ListHeading";
import SubscriptionsCard from "@/components/SubscriptionsCard";
import UpcomingSubscriptionsCard from "@/components/UpcomingSubscriptionsCard";
import {
  HOME_BALANCE,
  HOME_DEMO_NOTICE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import "@/global.css";
import { formatCurrency } from "@/lib/utils";

import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();

  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);

  const upcomingSubscriptions = UPCOMING_SUBSCRIPTIONS.map((subscription) => ({
    ...subscription,
    daysLeft: Math.max(
      0,
      dayjs(subscription.renewalDate).diff(dayjs(), "day"),
    ),
  }));

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
                      source={images.avatar}
                      className="home-avatar"
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 8,
                      }}
                    />

                    <Text className="home-user-name text-base font-sans-bold">
                      {HOME_USER.name}
                    </Text>
                  </View>

                  <Image
                    source={icons.add}
                    className="home-add-icon"
                    style={{
                      height: 32,
                      width: 32,
                    }}
                  />
                </View>

                <Text className="my-2 text-sm text-primary">
                  {HOME_DEMO_NOTICE}
                </Text>

                {/* 2. Balance Card */}
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
                    onPress={() => router.push("/subscriptions")}
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
                  onPress={() => router.push("/subscriptions")}
                />
              </>
            )}
            data={HOME_SUBSCRIPTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SubscriptionsCard
                {...item}
                expanded={expandedSubscriptionId === item.id}
                onPress={() =>
                  setExpandedSubscriptionId((currentId) =>
                    currentId === item.id ? null : item.id,
                  )
                }
              />
            )}
            extraData={expandedSubscriptionId}
            ItemSeparatorComponent={() => <View className="h-4" />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text className="home-empty-state">
                No Subscriptions Yet.
              </Text>
            }
            contentContainerClassName="pb-30"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}