import { Text, View } from "react-native";

interface ListHeadingProps {
  title: string;
  onPress: () => void;
}

const ListHeading = ({title}: ListHeadingProps) => {
    return (
        <View className="list-head">
            <Text className="list-title">{title}</Text>
            <Text className="list-action-text">View all</Text>
        </View>
    )
}

export default ListHeading;
