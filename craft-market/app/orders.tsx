import { FontAwesome, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OrdersScreen = () => {
    const orders = [
        {
            id: '1',
            date: '23/05/2020 - 23:20',
            address: '123 Main Street, City A',
            items: ['tomato', 'orange', 'banana'],
            price: '$15',
        },
        {
            id: '2',
            date: '23/05/2020 - 23:20',
            address: '456 Side Street, City B',
            items: ['broccoli', 'apple', 'grape'],
            price: '$25',
        },
    ];

    const productImages = {
        tomato: require('../assets/images/tomato.png'),
        orange: require('../assets/images/orange.png'),
        banana: require('../assets/images/banana.png'),
        broccoli: require('../assets/images/broccoli.png'),
        apple: require('../assets/images/banana.png'),
        grape: require('../assets/images/orange.png'),
    };

    const OrderItem = ({ id, date, address, items, price }) => (
        <View style={styles.orderContainer}>
            {/* Sağ üst köşede fiyat ve detay ikonu */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.addressText}>{address}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.priceText}>{price}</Text>
                    <TouchableOpacity onPress={() => router.push(`/order-detail`)}>
                        <SimpleLineIcons name="arrow-right" size={20} color="#FF5A5F" />
                    </TouchableOpacity>
                </View>

            </View>
     
            <FlatList
                data={items}
                horizontal
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Image source={productImages[item]} style={styles.productImage} />
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header2}>
                <TouchableOpacity onPress={() => router.replace('explore2')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Orders</Text>
            </View>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <OrderItem
                        id={item.id}
                        date={item.date}
                        address={item.address}
                        items={item.items}
                        price={item.price}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    orderContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF5A5F',
        marginHorizontal: 8
    },
    dateText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#919191'
    },
    addressText: {
        fontSize: 18,
        color: '#181725',
        fontWeight: '600',
        marginBottom: 10,
    },
    productImage: {
        width: 90,
        height: 90,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    header2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30
    },
});

export default OrdersScreen;
