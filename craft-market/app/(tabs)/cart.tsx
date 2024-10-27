import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const cartItems = [
  {
    id: '1',
    name: 'Broccoli',
    price: 10,
    totalPrice: 240,
    weight: '10 /kg',
    image: require('../../assets/images/broccoli.png'),
  },
  {
    id: '2',
    name: 'Banana',
    price: 10,
    totalPrice: 1200,
    weight: '10 /kg',
    image: require('../../assets/images/banana.png'),
  },
  {
    id: '3',
    name: 'Orange',
    price: 4,
    totalPrice: 200,
    weight: '4 /kg',
    image: require('../../assets/images/orange.png'),
  },
  {
    id: '4',
    name: 'Tomato',
    price: 8,
    totalPrice: 120,
    weight: '8 /kg',
    image: require('../../assets/images/tomato.png'),
  },
];

export default function CartScreen() {
  const renderItem = ({ item }) => (
    <CartItem
      name={item.name}
      price={item.price}
      totalPrice={item.totalPrice}
      weight={item.weight}
      image={item.image}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('Go back')} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cart</Text>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

// CartItem Bileşeni
function CartItem({ name, price, totalPrice, weight, image }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.totalPrice}>Total is <Text style={{color:'#000000'}}>${totalPrice}</Text> by weight</Text>
        <Text style={styles.price}>${price} /kg</Text>
      </View>
      <View style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>

      <TouchableOpacity style={styles.removeButton}>
          <Text style={styles.removeButtonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>

      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  backButton: {
    padding: 10,
    marginLeft: 15,
  },
  backButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  checkoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 14,
    color: '#888',
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  changeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,

    marginVertical: 8
  },
  changeButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  removeButton: {
   
    borderRadius: 8,
    width: 30,
    height: 30,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  removeButtonText: {
    fontSize: 20,
    color: 'black'
  },
});
