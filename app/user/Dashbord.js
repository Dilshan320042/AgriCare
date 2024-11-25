import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  const crops = [
    { id: '1', name: 'Paddy', details: 'Paddy is a staple crop.' },
    { id: '2', name: 'Tea', details: 'Tea grows in hilly regions.' },
  ];

  const navigateToCropDetails = (crop) => {
    router.push({
      pathname: '/user/Cropdetails',
      query: { crop: JSON.stringify(crop) },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={crops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigateToCropDetails(item)}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { padding: 10, marginVertical: 5, backgroundColor: '#ddd' },
  text: { fontSize: 16 },
});
