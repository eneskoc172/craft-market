import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AddressScreen = () => {
  // Adreslerin listesi (boş veya dolu olarak değiştirilebilir)
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      title: 'Home',
      address: '221 Baker St, Marylebone, London NW1 6XE, UK',
      icon: 'home',
    },
    {
      id: '2',
      title: 'Office',
      address: '221 Baker St, Marylebone, London NW1 6XE, UK',
      icon: 'business',
    },
  ]);

  // Adresler yoksa gösterilecek ekran
  if (addresses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image source={require('../assets/images/no-address.png')} style={styles.emptyImage} />
        <Text style={styles.emptyTitle}>No Saved Address</Text>
        <Text style={styles.emptySubtitle}>You can save your address to use it all the time</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Adresler varken gösterilecek ekran
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Addresses</Text>
        <TouchableOpacity>
          <MaterialIcons name="add" size={24} color="#F24E61" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.addressContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name={item.icon} size={24} color="#333" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.addressTitle}>{item.title}</Text>
              <Text style={styles.addressText}>{item.address}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#F24E61',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginTop:40,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
});

export default AddressScreen;
