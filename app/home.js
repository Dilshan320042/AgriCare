import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { Button } from 'react-native-web';


export default function home() {
    const router = useRouter();
  return (
    <View>
      <Text>home</Text>


      <Button
  title="Navigate to About using Route"
  onPress={() => router.push('/1')}
/>

    </View>
  );

  

}

const styles = StyleSheet.create({})