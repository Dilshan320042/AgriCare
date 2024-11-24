import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { styles } from './styles';

export default function ContactScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Screen</Text>

      {/* Link Navigation */}
      <Link href="/" style={styles.link}>
        Go Back to Home using Link
      </Link>
      <Link href="/about" style={styles.link}>
        Navigate to About using Link
      </Link>

      {/* Route Navigation */}
      <Button
        title="Go Back to Home using Route"
        onPress={() => router.push('/')}
      />
      <Button
        title="Navigate to About using Route"
        onPress={() => router.push('/about')}
      />
    </View>
  );
}
