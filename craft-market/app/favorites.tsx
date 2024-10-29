import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const FavoritesScreen = () => {
    // Favori ürünler listesi (boş veya dolu olarak değiştirilebilir)
    const [favorites, setFavorites] = useState([
        {
            id: '1',
            name: 'Ülker Chocolate 80% Bitter',
            price: 2.99,
            weight: '50g',
            image: require('../assets/images/broccoli.png'),
            quantity: 1,
        },
        {
            id: '2',
            name: 'Eti Keyfince Almond Chocolate',
            price: 1.99,
            weight: '62g',
            image: require('../assets/images/orange.png'),
            quantity: 4,
        },
        {
            id: '3',
            name: 'Eti Gurme - Karam',
            price: 0.99,
            weight: '50g',
            image: require('../assets/images/banana.png'),
            quantity: 1,
        },
        {
            id: '4',
            name: 'Eti Gurme - Ahenk',
            price: 0.99,
            weight: '50g',
            image: require('../assets/images/broccoli.png'),
            quantity: 1,
        },
    ]);

    // Favoriler boşsa gösterilecek ekran
    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Image source={require('../assets/images/heart-empty.png')} style={styles.emptyImage} />
                <Text style={styles.emptyTitle}>Your heart is empty</Text>
                <Text style={styles.emptySubtitle}>Start fall in love with some good goods</Text>
                <TouchableOpacity style={styles.startShoppingButton}>
                    <Text style={styles.startShoppingText}>Start Shopping</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Favoriler doluyken gösterilecek ekran
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('explore2')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Favorites</Text>
            </View>

            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image source={ item.image } style={styles.productImage} />
                        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productWeight}>{item.weight}</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.incrementButton}>
                                <Text style={styles.incrementText}>+</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity style={styles.decrementButton}>
                                <Text style={styles.decrementText}>-</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        paddingHorizontal: 10,
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
    startShoppingButton: {
        backgroundColor: '#F24E61',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 20,
    },
    startShoppingText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    productContainer: {
        flex: 1,
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    productImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 14,
        color: '#F24E61',
        fontWeight: 'bold',
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 5,
    },
    productWeight: {
        fontSize: 12,
        color: '#666',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    incrementButton: {
        backgroundColor: '#F24E61',
        borderRadius: 15,
        padding: 5,
        marginRight: 10,
    },
    decrementButton: {
        backgroundColor: '#F24E61',
        borderRadius: 15,
        padding: 5,
        marginLeft: 10,
    },
    incrementText: {
        color: '#FFF',
        fontSize: 14,
    },
    decrementText: {
        color: '#FFF',
        fontSize: 14,
    },
    quantityText: {
        fontSize: 16,
        color: '#333',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop:50
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
      },
});

export default FavoritesScreen;
