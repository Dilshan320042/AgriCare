import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const crops = [
    { id: '1', name: 'Paddy', image: require('../../assets/images/paddy.png') },
    { id: '2', name: 'Tea', image: require('../../assets/images/Tea.png') },
    { id: '3', name: 'Banana', image: require('../../assets/images/Banana.png') },
    { id: '4', name: 'Coconut', image: require('../../assets/images/Coconut.png') },
  ];

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleSearchBar = () => {
    setIsSearching(!isSearching);
    setSearchText('');
  };
  const navigateToCropDetails = (crop) => { // Line ~38
    router.push({
      pathname: '/user/Cropdetails',
      query: { crop: JSON.stringify(crop) }, // Line ~40
    });
  };

  const openMenu = () => {
    console.log('Menu button pressed');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        {isSearching ? (
          <TextInput
            style={styles.searchBar}
            placeholder="Search crops"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
        ) : (
          <Text style={styles.headerTitle}>Dashboard</Text>
        )}
        <TouchableOpacity onPress={toggleSearchBar}>
          <Ionicons
            name={isSearching ? 'close' : 'search'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {filteredCrops.map((crop) => (
          <TouchableOpacity
            key={crop.id}
            style={styles.card}
            onPress={() => navigateToCropDetails(crop)}
          >
            <Image source={crop.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{crop.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
  },
  header: {
    height: 80,
    backgroundColor: 'rgba(67, 160, 71, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  card: {
    width: '45%',
    height: 180,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  cardImage: {
    width: '90%',
    height: '65%',
    borderRadius: 8,
  },
  cardTitle: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2E7D32',
  },
  bottomNav: {
    height: 70,
    backgroundColor: '#66BB6A',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
