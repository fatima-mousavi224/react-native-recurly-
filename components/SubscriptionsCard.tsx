import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from "@/lib/utils";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { Image, Pressable, Text, View } from "react-native";

const ICON_TYPE_MAP = {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} as const;

const SubscriptionsCard = ({
  name,
  price,
  currency,
  icon,
  billing,
  color,
  category,
  plan,
  renewalDate,
  expanded,
  paymentMethod,
  startDate,
  onPress,
  status,
  iconType,
  iconName,
}: SubscriptionCardProps) => {
  const iconColor = color || "#8fd1bd";
  const IconComponent = iconType ? ICON_TYPE_MAP[iconType as keyof typeof ICON_TYPE_MAP] : null;
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "sub-card",
        expanded ? "sub-card-expanded" : "bg-background",
      )}
      style={expanded && color ? { backgroundColor: color } : undefined}
    >
      <View className="sub-head ">
        <View className="sub-main">
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: iconColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {IconComponent && iconName ? (
              <IconComponent name={iconName as any} size={24} color="#fff" />
            ) : (
              <Image
                source={icon}
                style={{ width: 30, height: 30 }}
              />
            )}
          </View>
          <View className="sub-copy">
            <Text numberOfLines={1} className="sub-title">
              {name}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {category?.trim() ||
                plan?.trim() ||
                (renewalDate ? formatSubscriptionDateTime(renewalDate) : "")}
            </Text>
          </View>
        </View>

        <View className="sub-price-box">
          <Text className="sub-price">{formatCurrency(price, currency)}</Text>
          <Text className="sub-billing">{billing}</Text>
        </View>
      </View>

      {expanded && (
        <View className="sub-body ">
          <View className="sub-details">
            {/* 1 */}
            <View className="sub-row ">
              <View className="sub-row-copy">
                <Text className="sub-title">Payment:</Text>
                <Text className="sub-value">{paymentMethod?.trim()}</Text>
              </View>
            </View>
            {/* 2 */}
            <View className="sub-row ">
              <View className="sub-row-copy">
                <Text className="sub-title">Category:</Text>
                <Text className="sub-value">{category?.trim() || plan?.trim()}</Text>
              </View>
            </View>
            {/* 3 */}
            <View className="sub-row ">
              <View className="sub-row-copy">
                <Text className="sub-title">Started:</Text>
                <Text className="sub-value">{startDate ? formatSubscriptionDateTime(startDate) : ""}</Text>
              </View>
            </View>
            {/* 4 */}
            <View className="sub-row ">
              <View className="sub-row-copy">
                <Text className="sub-title">Renewal:</Text>
                <Text className="sub-value">{renewalDate ? formatSubscriptionDateTime(renewalDate) : ""}</Text>
              </View>
            </View>
            {/* 5 */}
            <View className="sub-row ">
              <View className="sub-row-copy">
                <Text className="sub-title">Status:</Text>
                <Text className="sub-value">{status ? formatStatusLabel(status) : ""}</Text>
              </View>
            </View>
            {/* --------- */}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default SubscriptionsCard;
