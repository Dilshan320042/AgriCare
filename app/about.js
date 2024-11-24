import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { styles } from './styles';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Screen</Text>

      {/* Link Navigation */}
      <Link href="/" style={styles.link}>
        Go Back to Home using Link
      </Link>
      <Link href="/contact" style={styles.link}>
        Navigate to Contact using Link
      </Link>

      {/* Route Navigation */}
      <Button
        title="Go Back to Home using Route"
        onPress={() => router.push('/')}
      />
      <Button
        title="Navigate to Contact using Route"
        onPress={() => router.push('/contact')}
      />
    </View>
  );
}
