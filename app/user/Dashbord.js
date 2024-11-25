import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();


  const crops = [
    { name: 'Paddy', image: require('../../assets/images/paddy.png'), screen: 'PaddyScreen' },
    { name: 'Tea', image: require('../../assets/images/Tea.png'), screen: 'TeaScreen' },
    { name: 'Coconut', image: require('../../assets/images/Coconut.png'), screen: 'CoconutScreen' },
    { name: 'Banana', image: require('../../assets/images/Banana.png'), screen: 'BananaScreen' },
  ];
  
  
  
  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const navigateToCropScreen = (cropScreen) => {
    navigation.navigate(cropScreen);
  };

  const toggleSearchBar = () => {
    setIsSearching(!isSearching);
    setSearchText('');
  };

  const openMenu = () => {
    console.log("Menu button pressed");
    // Add any action you want, like opening a drawer or showing an alert
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Menu Button */}
        <TouchableOpacity onPress={openMenu}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>

        {isSearching ? (
          <TextInput
            style={styles.searchBar}
            placeholder="Search here"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
        ) : (
          <Text style={styles.headerTitle}>Welcome Back!</Text>
        )}

        <TouchableOpacity onPress={toggleSearchBar}>
          <Ionicons name={isSearching ? "close" : "search"} size={24} color="#fff" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Hi, Choudary Aoun</Text>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {filteredCrops.map((crop, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigateToCropScreen(crop.screen)}
          >
            <Image source={crop.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{crop.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={showDatePicker}>
          <Ionicons name="calendar" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#388E3C',
    margin: 20,
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
