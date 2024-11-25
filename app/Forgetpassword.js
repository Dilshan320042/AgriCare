import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router'; // For navigation

export default function ForgotPasswordScreen() {
  const router = useRouter(); // Router for navigation
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleResetPassword = () => {
    if (!username || !email || !telephone) {
      Alert.alert('Error', 'Please enter your username, email, and telephone number.');
      return;
    }
    Alert.alert('Password Reset', 'A password reset link has been sent to your email.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image
          source={require('../assets/images/Back.png')} // Ensure the path is correct
          style={[styles.backImage, { tintColor: '#2E7D32' }]} // Green tint
        />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your username, email address, and telephone number, and we'll send you a link to reset your password.
        </Text>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        {/* Telephone Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Telephone Number"
            value={telephone}
            onChangeText={setTelephone}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10, // Ensures it's on top
    padding: 10, // Larger touchable area
  },
  backImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  card: {
    width: '85%',
    padding: 25,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4CAF50', // Green theme color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#F9F9F9',
  },
  input: {
    flex: 1,
    padding: 12,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#4CAF50', // Green color for the reset button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
