import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { styles } from './styles';
 

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {/* Link Navigation */}
      <Link href="/about" style={styles.link}>
        Navigate to About using Link
      </Link>
      <Link href="/contact" style={styles.link}>
        Navigate to Contact using Link
      </Link>
      <Link href="/home" style={styles.link}>
        Link
      </Link>
      {/* Route Navigation */}
      <Button
        title="Navigate to About using Route"
        onPress={() => router.push('/about')}
      />
      <Button
        title="Navigate to Contact using Route"
        onPress={() => router.push('/contact')}
      />
 <Button
        title=" Route"
        onPress={() => router.push('/contact')}
      />


      <text>ths is my new checking</text>


      <Button
      title="click here"
      onPress ={() => router.push('/check')}
      />

<Button
  title="Go to Page One"
  onPress={() => router.push('/one')}
/>



    </View>
  );
}
