import { Link } from 'expo-router'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class SignUp extends Component {
  render() {
    return (
      <View>
        <Text> Sign up page </Text>
        <Link href='/(auth)/sign-up'>Sign up page </Link>
      </View>
    )
  }
}

export default SignUp
