import { formatCurrency } from "@/lib/utils";
import { Image, Text, View } from "react-native";

const UpcomingSubscriptionsCard = (
  { name, price, daysLeft, icon, currency }: UpcomingSubscription) => {
  return (
    <View className="upcoming-card">
      <View className="upcoming-row">
        <View className="bg-muted rounded-lg p-3 ">
          <Image
            source={icon}
            className="upcoming-icon"
            style={{ width: 44, height: 44 }}
          />
        </View>
        <View>
          <Text className="upcoming-price">
            {formatCurrency(price, currency)}
          </Text>
          <Text className="upcoming-meta" numberOfLines={1}>
            {daysLeft > 1 ? `${daysLeft} days left` : `Last day`}
          </Text>
        </View>
      </View>

      <Text className="upcoming-name" numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

export default UpcomingSubscriptionsCard;
