import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [zone, setZone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    console.log("Register button pressed");
  };

  const handleSocialLogin = () => {
    console.log("Google login button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
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

        {/* Zone Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={zone}
            onValueChange={(itemValue) => setZone(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Zone" value="" color="#999" />
            <Picker.Item label="Wet Zone" value="Wet Zone" />
            <Picker.Item label="Dry Zone" value="Dry Zone" />
            <Picker.Item label="Intermediate Zone" value="Intermediate Zone" />
          </Picker>
        </View>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        {/* Or continue with text */}
        <Text style={styles.orText}>Or continue with</Text>

        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          {/* Google Login */}
          <TouchableOpacity style={styles.socialButton} onPress={handleSocialLogin}>
            <Image source={require('../assets/images/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
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
    color: '#4CAF50',
    marginBottom: 20,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#4CAF50', // Green color for register button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    color: '#666',
    marginVertical: 10,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});