import { Link } from 'expo-router'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class SignIn extends Component {
  render() {
    return (
      <View>
        <Text> Sign In Page wellcome  </Text>
        <Link href='/(auth)/sign-in'>Sign in </Link>
      </View>
    )
  }
}

export default SignIn