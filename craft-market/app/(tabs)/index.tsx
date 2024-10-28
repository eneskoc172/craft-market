import { Image, StyleSheet, Platform, TouchableOpacity, FlatList, Text, View, TextInput, ScrollView } from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import React from 'react';

const categories = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Vegetables' },
  { id: '3', name: 'Fish' },
];

const topProducts = [
  { id: '1', name: 'Broccoli', weight: '100g', price: 4, unit: '/kg', image: require('../../assets/images/broccoli.png') },
  { id: '2', name: 'Gedang', weight: '100g', price: 10, unit: '/kg', image: require('../../assets/images/banana.png') },
  { id: '3', name: 'Broccoli', weight: '100g', price: 4, unit: '/kg', image: require('../../assets/images/broccoli.png') }
];

const recommendations = [
  { id: '1', name: 'Avocado', weight: '220g', price: 9, unit: '/kg', image: require('../../assets/images/avocado.png') },
  { id: '2', name: 'Orange', weight: '160g', price: 4, unit: '/kg', image: require('../../assets/images/orange.png') },
];



export default function HomeScreen() {
  const router = useRouter();

  const ProductCard = ({ product }) => (
    <TouchableOpacity
    onPress={()=> router.replace('/product-deail')} style={styles.productCard}>
      <View style={{ width: 120, alignItems: 'center' }}>
  
  
        <Image source={product.image} style={styles.productImage} />
      </View>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productWeight}>weight <Text style={{ fontWeight: '900', color: 'black' }}>{product.weight}</Text></Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 140, paddingVertical: 8 }}>
        <Text style={styles.productPrice}>${product.price}{product.unit}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.username}>Ghazi</Text>
        <Text style={styles.location}>📍 Tlogomas, Malang</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <TouchableOpacity style={styles.filterButton}>
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryButton}>
            <Text style={{color:'#3D3D3D',fontSize:16}}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Top Products */}
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:8}}>
        <Text style={styles.sectionTitle}>Top Products</Text>
        <Text style={styles.sectionTitle}>Show All</Text>
      </View>

      <FlatList
        horizontal
        data={topProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />

      {/* Recommendations */}
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:8}}>
      <Text style={styles.sectionTitle}>Recommendation</Text>
      <Text style={styles.sectionTitle}>Show All</Text>
      </View>
      <FlatList
        horizontal
        data={recommendations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4FC',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  filterButton: {
    marginLeft: 10,
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#FCFEFF',
    paddingHorizontal: 16,
    paddingVertical:8,
    borderRadius: 16,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
  },
  productCard: {
    width: 160,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginRight: 10,

  },
  productImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  productWeight: {
    fontSize: 14,
    color: '#888',
    paddingVertical: 4
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 4,
  },
  addButton: {
    backgroundColor: '#FF6347',
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 20
  },
});
