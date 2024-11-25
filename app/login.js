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
import { Link, useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter(); // Using Expo Router for navigation
  const [isAdmin, setIsAdmin] = useState(false); // Default is User Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (isAdmin) {
      // Admin Login Logic
      if (email === 'Admin@example.com' && password === 'Admin123') {
        router.push('/Admin/Admin_Dashbord');
      } else {
        Alert.alert('Login Failed', 'Invalid Admin email or password.');
      }
    } else {
      // User Login Logic
      if (email === 'User@example.com' && password === 'User123') {
        router.push('/user/Dashbord');
      } else {
        Alert.alert('Login Failed', 'Invalid User email or password.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, !isAdmin && styles.activeButton]}
          onPress={() => setIsAdmin(false)}
        >
          <Text style={[styles.toggleText, !isAdmin && styles.activeText]}>
            User Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, isAdmin && styles.activeButton]}
          onPress={() => setIsAdmin(true)}
        >
          <Text style={[styles.toggleText, isAdmin && styles.activeText]}>
            Admin Login
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>{isAdmin ? 'Admin Login' : 'User Login'}</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
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

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Forgot Password', 'Redirect to Forgot Password page.')
          }
        >
          <Text style={styles.forgotText}>
            Forgot your password?{' '}
            <Link href="/Forgetpassword" style={styles.registerText}>
              Reset here
            </Link>
          </Text>
        </TouchableOpacity>

        {/* Register New Account */}
        <TouchableOpacity
          onPress={() => Alert.alert('Register', 'Redirect to Register page.')}
          style={styles.registerContainer}
        >
          <Link href="/register" style={styles.registerText}>
            <Text style={styles.registerText}>Register new account</Text>
          </Link>
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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#4CAF50', // Green for active toggle
  },
  toggleText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  activeText: {
    color: 'white', // White text for active toggle
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
    color: '#4CAF50', // Green color for title
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
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
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  registerContainer: {
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
