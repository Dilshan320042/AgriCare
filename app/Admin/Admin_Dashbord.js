import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert, Modal, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AdminDashboard() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [crops, setCrops] = useState([
    { name: 'Paddy', image: require('../../assets/images/paddy.png'), screen: 'PaddyScreen' },
    { name: 'Tea', image: require('../../assets/images/Tea.png'), screen: 'TeaScreen' },
    { name: 'Coconut', image: require('../../assets/images/Coconut.png'), screen: 'CoconutScreen' },
    { name: 'Banana', image: require('../../assets/images/Banana.png'), screen: 'BananaScreen' },
  ]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [newCropName, setNewCropName] = useState('');
  const [newCropImage, setNewCropImage] = useState(null);
  const [newNameForAdd, setNewNameForAdd] = useState('');
  const [newImageForAdd, setNewImageForAdd] = useState(null);

  const navigation = useNavigation();

  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const navigateToCropScreen = (cropScreen) => navigation.navigate(cropScreen);

  const openEditModal = (crop) => {
    setSelectedCrop(crop);
    setNewCropName(crop.name);
    setNewCropImage(crop.image);
    setEditModalVisible(true);
  };

  const openAddModal = () => {
    setNewNameForAdd('');
    setNewImageForAdd(null);
    setAddModalVisible(true);
  };

  const handleImagePickForEdit = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewCropImage({ uri: result.uri });
    }
  };

  const handleImagePickForAdd = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewImageForAdd({ uri: result.uri });
    }
  };

  const saveCropChanges = () => {
    setCrops(prevCrops =>
      prevCrops.map(crop =>
        crop.name === selectedCrop.name
          ? { ...crop, name: newCropName, image: newCropImage }
          : crop
      )
    );
    setEditModalVisible(false);
  };

  const addNewCrop = () => {
    if (!newNameForAdd || !newImageForAdd) {
      Alert.alert("Error", "Please provide both a name and an image for the crop.");
      return;
    }

    setCrops(prevCrops => [
      ...prevCrops,
      { name: newNameForAdd, image: newImageForAdd, screen: `${newNameForAdd}Screen` }
    ]);
    setAddModalVisible(false);
  };

  const deleteCrop = (crop) => {
    Alert.alert(
      "Delete Crop",
      `Are you sure you want to delete ${crop.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
          setCrops(prevCrops => prevCrops.filter(item => item.name !== crop.name));
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search here"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {filteredCrops.map((crop, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity onPress={() => navigateToCropScreen(crop.screen)} style={styles.imageContainer}>
              <Image source={crop.image} style={styles.cardImage} />
            </TouchableOpacity>
            <Text style={styles.cardTitle}>{crop.name}</Text>

            {/* Edit Icon */}
            <TouchableOpacity style={styles.editIcon} onPress={() => openEditModal(crop)}>
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>

            {/* Delete Icon */}
            <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteCrop(crop)}>
              <Ionicons name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Edit Modal */}
      {selectedCrop && (
        <Modal visible={editModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Crop</Text>
              <TextInput
                style={styles.input}
                value={newCropName}
                onChangeText={setNewCropName}
                placeholder="Crop Name"
              />
              <TouchableOpacity onPress={handleImagePickForEdit} style={styles.imagePicker}>
                <Image source={newCropImage} style={styles.previewImage} />
                <Text style={styles.imagePickerText}>Change Image</Text>
              </TouchableOpacity>
              <Button title="Save Changes" onPress={saveCropChanges} />
              <Button title="Cancel" color="red" onPress={() => setEditModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}

      {/* Add Modal */}
      <Modal visible={addModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Crop</Text>
            <TextInput
              style={styles.input}
              value={newNameForAdd}
              onChangeText={setNewNameForAdd}
              placeholder="Crop Name"
            />
            <TouchableOpacity onPress={handleImagePickForAdd} style={styles.imagePicker}>
              {newImageForAdd ? (
                <>
                  <Image source={newImageForAdd} style={styles.previewImage} />
                  <TouchableOpacity onPress={addNewCrop} style={styles.selectButton}>
                    <Text style={styles.selectButtonText}>Select</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <Text style={styles.imagePickerText}>Select Image</Text>
              )}
            </TouchableOpacity>
            <Button title="Add Crop" onPress={addNewCrop} />
            <Button title="Cancel" color="red" onPress={() => setAddModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => console.log(date)}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f5e9' },
  header: {
    height: 80,
    backgroundColor: 'rgba(67, 160, 71, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: { color: '#FFF', fontSize: 22, fontWeight: '700' },
  searchBar: { flex: 1, backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 10, marginLeft: 10 },
  cardContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingHorizontal: 10 },
  card: {
    width: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 6,
    overflow: 'hidden',
    position: 'relative',
    paddingVertical: 10,
  },
  imageContainer: { width: '100%', height: 120 },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardTitle: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
  },
  editIcon: { position: 'absolute', bottom: 10, right: 10, backgroundColor: '#000', padding: 5, borderRadius: 15 },
  deleteIcon: { position: 'absolute', bottom: 10, left: 10, backgroundColor: '#FF5252', padding: 5, borderRadius: 15 },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#66BB6A',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  imagePicker: { alignItems: 'center', marginVertical: 10 },
  previewImage: { width: 100, height: 100, marginBottom: 10 },
  imagePickerText: { color: '#388E3C', fontWeight: 'bold' },
  selectButton: {
    backgroundColor: '#66BB6A',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  selectButtonText: { color: '#fff', fontWeight: 'bold' },
});
