import React, { Component } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export class Insight extends Component {
  render() {
    return (
      <SafeAreaView className="bg-background flex-1">
        <View className="flex-1 p-5">
          <Text> insight page </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Insight;
