// app/PROFILECHANGE.JS
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter,Link } from 'expo-router';
import { Button } from 'react-native-web';


export default function ProfileDetailsScreen() {
  const router = useRouter(); // Using expo-router for navigation
  const [profileImage, setProfileImage] = useState(require('../../assets/images/Profile.png')); // Default profile image
  const [email, setEmail] = useState("N.jackman@gmail.com");
  const [phone, setPhone] = useState("123-456-7890");

  // Function to open the image picker and update profile image
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage({ uri: result.assets[0].uri }); // Set the selected image
    }
  };

  // Function to simulate profile update on Save Changes button
  const handleSaveChanges = () => {
    Alert.alert("Profile Updated", "Your changes have been saved successfully!");
    // Add code here to save changes to a server or local storage if needed.
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
                <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/user/Dashbord')} // Navigate to Dashboard
            activeOpacity={0.7}
            >
          <Image
                 source={require('../../assets/images/Back.png')}
                 style={[styles.backImage, { tintColor: '#2E7D32' }]} // Apply green tint
        />

            </TouchableOpacity>



      <Text style={styles.headerText}>Profile Details</Text>

      {/* Profile Image Section with Cloud Icon */}
      <View style={styles.profileImageContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <TouchableOpacity style={styles.uploadIcon} onPress={handleImagePick}>
          <Ionicons name="cloud-upload-outline" size={20} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#A5D6A7"
          defaultValue="Vishal"
          editable={false} // First name is not editable
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#A5D6A7"
          defaultValue="Nikeshala"
          editable={false} // Last name is not editable
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#A5D6A7"
          value={email}
          onChangeText={(text) => setEmail(text)} // Email is editable
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#A5D6A7"
          value={phone}
          onChangeText={(text) => setPhone(text)} // Phone number is editable
          keyboardType="phone-pad"
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.changeButton} onPress={handleSaveChanges}>
        <Text style={styles.changeButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Light green background
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10, // Bring it to the front
    padding: 10, // Increase the touchable area
  },
  
  backImage: {
    width: 24, // Adjust the size of the image
    height: 24,
    resizeMode: 'contain',
  },
  
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#C8E6C9',
  },
  uploadIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 5,
    borderColor: '#2E7D32',
    borderWidth: 1,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 50,
    backgroundColor: '#F1F8E9', // Very light green input background
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#2E7D32', // Dark green text
    fontSize: 16,
  },
  changeButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
