import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-web'
import { router } from 'expo-router'

export default function home() {
  return (
    <View>
      <Text>this is check</Text>

      <Button
      title='Help'
      onPress={()=>router.push('/home')}
      />


    </View>
  )
}

const styles = StyleSheet.create({})