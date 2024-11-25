import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function CropDetails() {
  const router = useRouter();
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    // Parse the crop data from the router query
    if (router.query?.crop) {
      try {
        const cropData = JSON.parse(router.query.crop);
        setCrop(cropData);
      } catch (error) {
        console.error('Error parsing crop data:', error);
        setCrop({ name: 'Unknown Crop', details: 'No details available.' }); // Fallback for errors
      }
    }
  }, [router.query]);

  const additionalData = [
    { id: '1', text: 'දේශගුණික අවශ්යතා', icon: 'wb-sunny' },
    { id: '2', text: 'පස සැකසීම', icon: 'landscape' },
    { id: '3', text: 'පැළ රෝපණය', icon: 'nature' },
    { id: '4', text: 'ජල කලාමාරණය', icon: 'water-drop' },
    { id: '5', text: 'පොහොර යෙදීම', icon: 'science' },
    { id: '6', text: 'වල් පැළෑටි පාලනය', icon: 'grass' },
    { id: '7', text: 'පළිබෝධ පාලනය', icon: 'pest-control' },
    { id: '8', text: 'අස්වනු නෙළීම', icon: 'agriculture' },
  ];

  return (
    <ImageBackground source={require('../../assets/images/Wallpaper.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Header Section */}
        <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{crop ? crop.name : 'Crop Details'}</Text> {/* Display crop name */}
          <TouchableOpacity style={styles.homeButton}>
            <Icon name="home" size={30} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Additional Static Details */}
        <FlatList
          data={additionalData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => alert(item.text)}>
              <Icon name={item.icon} size={24} color="#2E7D32" style={styles.itemIcon} />
              <Text style={styles.itemText}>{item.text}</Text>
              <Icon name="chevron-right" size={24} color="#4CAF50" style={styles.arrowIcon} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(70, 240, 250, 0.35)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
  },
  menuButton: {
    marginRight: 15,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  homeButton: {
    marginLeft: 15,
  },
  cropDetails: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 16,
    borderRadius: 12,
    elevation: 4,
  },
  cropTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
    textAlign: 'center',
  },
  cropDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8E6C9',
    borderRadius: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 15,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  itemIcon: {
    marginRight: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    color: '#1B5E20',
    fontWeight: 'bold',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
});
