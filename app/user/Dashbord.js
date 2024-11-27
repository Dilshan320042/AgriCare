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
import { Link, useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function Dashboard() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const crops = [
    { id: '1', name: 'Paddy', image: require('../../assets/images/paddy.png') },
    { id: '2', name: 'Tea', image: require('../../assets/images/Tea.png') },
    { id: '3', name: 'Banana', image: require('../../assets/images/Banana.png') },
    { id: '4', name: 'Coconut', image: require('../../assets/images/Coconut.png') },
  ];

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const toggleSearchBar = () => {
    setIsSearching(!isSearching);
    setSearchText('');
  };

  const navigateToCropDetails = (crop) => {
    console.log("Navigating to Cropdetails with crop:", crop); // Debugging
    router.push({
      pathname: '/user/Cropdetails',
      query: { crop: JSON.stringify(crop) },
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

      {/* Footer */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={showDatePicker}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={28} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <View style={[styles.iconContainer, styles.addButton]}>
            <Ionicons name="add" size={32} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.navButton}>
  <Link href="/user/profilechange">
    <View style={styles.iconContainer}>
      <Ionicons name="person" size={24} color="#fff" />
    </View>
  </Link>
</View>

      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          if (date) {
            setSelectedDate(date);
            hideDatePicker();
          }
        }}
        onCancel={hideDatePicker}
      />
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
    height: 80,
    backgroundColor: '#66BB6A',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 10,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },iconContainer: {
  width: 60,
  height: 60,
  backgroundColor: '#4caf50',
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 5,
  transition: 'transform 0.2s', // Smooth scaling
},

navButtonPressed: {
  transform: [{ scale: 0.95 }],
  backgroundColor: '#388E3C', // Slightly darker green when pressed
},

addButton: {
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: '#ff9800',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#ffaa00',
  shadowOpacity: 0.8,
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 20,
  transform: [{ scale: 1 }],
  transition: 'transform 0.2s', // Smooth scaling
},

});
