import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const product = {
  name: 'Broccoli',
  category: 'Vegetables',
  price: 4,
  unit: '/Adet',
  images: [
    require('../assets/images/craft/1-Photoroom (1).jpg'),
    require('../assets/images/craft/1-Photoroom (2).jpg'),
    require('../assets/images/craft/1-Photoroom (3).jpg'),
    require('../assets/images/craft/1-Photoroom (4).jpg')
  ],
};

export default function ProductDetailScreen() {
    const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
       onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.heartButton}>♡</Text>
        </TouchableOpacity>
      </View>
      {/* Product Details */}
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productCategory}>{product.category}</Text>
      {/* Product Image */}
      <Image source={selectedImage} style={styles.mainImage} />


      <Text style={styles.productPrice}>${product.price}{product.unit}</Text>

      {/* Quantity Selector */}
      <View style={styles.quantitySelector}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Showcase Images */}
      <Text style={styles.showcasesTitle}>Showcases</Text>
      <FlatList
        horizontal
        data={product.images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImage(item)} style={styles.showcaseImageContainer}>
            <Image source={item} style={styles.showcaseImage} />
          </TouchableOpacity>
        )}
      />

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 28,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 35,
  },
  backButton: {
    fontSize: 30,
  },
  heartButton: {
    fontSize: 30,
  },
  mainImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 32,
    fontWeight: '700',
    color:'#1B1B1B',
    textAlign: 'center',
  },
  productCategory: {
    fontSize: 18,
    color: '#1B1B1B',
    textAlign: 'center',
    marginBottom: 10,

  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  quantitySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  quantityButtonText: {
    fontSize: 24,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  showcasesTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  showcaseImageContainer: {
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    width:85,
    height:85,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:14,
    borderWidth:2,
borderColor: '#F3F3F3',
  },
  showcaseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  addToCartButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:34
  },
  addToCartButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
