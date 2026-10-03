import { Link, useLocalSearchParams } from "expo-router"
import { View , Text} from "react-native"


const SubscriptionDatils = () => {
    const {id} = useLocalSearchParams<{id: string}>()
    return (
        <View>
            <Text>Subscription Details {id}</Text>
            <Link href='/index'>Go back</Link>
        </View>
    )
}

export default SubscriptionDatils