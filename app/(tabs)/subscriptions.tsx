import React, { Component } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export class Subscriptions extends Component {
  render() {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 p-5">
          <Text> subscriptions page single </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Subscriptions;
