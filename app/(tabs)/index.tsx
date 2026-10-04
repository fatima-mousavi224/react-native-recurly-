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
import { useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [expendedSuscriptionId, setExpendedSuscriptionId] = useState<
    string | null
  >(null);
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* 4. Subscriptions Section */}
        <View className="mb-10">
          
          <FlatList
            ListHeaderComponent={() => (
              <>
                {/* 1. Header */}
                <View className="home-header">
                  <View className="home-user">
                    <Image
                      source={images.avatar}
                      className="home-avatar"
                      style={{ width: 64, height: 64, borderRadius: 8 }}
                    />
                    <Text className="home-user-name text-base font-sans-bold">
                      {HOME_USER.name}
                    </Text>
                  </View>
                  <Image
                    source={icons.add}
                    className="home-add-icon"
                    style={{ height: 32, width: 32 }}
                  />
                </View>

                <Text className="my-2 text-sm text-primary">
                  {HOME_DEMO_NOTICE}
                </Text>

                {/* 2. Balance Card */}
                <View className="home-balance-card">
                  <Text className="home-balance-label">Balance</Text>
                  <View className="home-balance-row">
                    <Text className="home-balance-amount">
                      {formatCurrency(HOME_BALANCE.amount)}
                    </Text>
                    <Text className="home-balance-date">
                      {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                    </Text>
                  </View>
                </View>

                {/* 3. Upcoming Horizontal List */}
                <View className="mb-5">
                  <ListHeading title="Upcoming" />
                  <FlatList
                    data={UPCOMING_SUBSCRIPTIONS}
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

                <ListHeading title="All Subscript" />
              </>
            )}
            data={HOME_SUBSCRIPTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SubscriptionsCard
                {...item}
                expanded={expendedSuscriptionId === item.id}
                onPress={() =>
                  setExpendedSuscriptionId((currentId) =>
                    currentId === item.id ? null : item.id,
                  )
                }
              />
            )}
            extraData={expendedSuscriptionId}
            ItemSeparatorComponent={() => <View className="h-4" />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text className="home-empty-state">No Subscriptions Yet.</Text>
            }
            contentContainerClassName="pb-30"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
