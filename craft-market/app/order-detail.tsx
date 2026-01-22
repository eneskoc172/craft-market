import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const OrderDetailScreen = () => {

    const order = {
        id: '001',
        date: '23/05/2020 - 23:20',
        status: 'Shipped', // Sipariş durumu
        address: '221 Baker St, Marylebone, London NW1 6XE, United Kingdom',
        items: [
            { name: 'Tomato', price: 5, quantity: 2, image: require('../assets/images/tomato.png'), },
            { name: 'Banana', price: 10, quantity: 1, image: require('../assets/images/banana.png'), },
            { name: 'Orange', price: 8, quantity: 3, image: require('../assets/images/orange.png'), },
        ],
        discount: 5, // İndirim miktarı
    };

    const calculateTotalPrice = () => {
        return order.items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const totalPrice = calculateTotalPrice();
    const finalPrice = totalPrice - order.discount;
    const discountSavings = totalPrice - finalPrice;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header2}>
                <TouchableOpacity onPress={() => router.replace('orders')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Orders</Text>
            </View>
            {/* Sipariş Bilgisi */}
            <View style={styles.orderInfoContainer}>
                <Text style={styles.infoText}>No:  <Text style={styles.infoValue}>{order.id}</Text></Text>


                <Text style={styles.infoValue}>{order.date}</Text>
            </View>

            {/* Sipariş Durumu */}
            <Text style={styles.sectionTitle}>Status</Text>
            <View style={styles.statusContainer}>
                <Text style={styles.statusStep}>Ordered</Text>
                <Text style={styles.statusStep}>Packed</Text>
                <Text style={styles.statusStep}>Shipped</Text>
                <Text style={styles.statusStep}>Delivered</Text>
            </View>
            <Text style={styles.currentStatus}>{order.status}</Text>

            {/* Adres */}
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.addressText}>{order.address}</Text>

            {/* Ürün Listesi */}
            <Text style={styles.sectionTitle}>Products</Text>
            <FlatList
                data={order.items}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image source={item.image} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
                            <Text style={styles.productPrice}>${item.price * item.quantity}</Text>
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />

            {/* Fiyat Bilgisi */}
            <View style={styles.priceContainer}>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Total Price:</Text>
                    <Text style={styles.priceValue}>${totalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Discount:</Text>
                    <Text style={styles.discountValue}>-${order.discount.toFixed(2)}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Final Total:</Text>
                    <Text style={styles.priceValue}>${finalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.savingsLabel}>You Saved:</Text>
                    <Text style={styles.savingsValue}>${discountSavings.toFixed(2)}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        padding: 20,
    },
    orderInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    infoValue: {
        fontSize: 16,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F24E61',
        marginTop: 20,
        marginBottom: 10,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    statusStep: {
        fontSize: 14,
        color: '#888',
    },
    currentStatus: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F24E61',
        marginBottom: 20,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    productImage: {
        width: 90,
        height: 90,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productQuantity: {
        fontSize: 14,
        color: '#666',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    priceContainer: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    priceLabel: {
        fontSize: 16,
        color: '#333',
    },
    priceValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    discountValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F24E61',
    },
    savingsLabel: {
        fontSize: 16,
        color: '#333',
    },
    savingsValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F24E61',
    },
    header2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30
    },
});

export default OrderDetailScreen;
