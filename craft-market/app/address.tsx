import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const AddressScreen = () => {

    const [addresses, setAddresses] = useState([
        {
            id: '1',
            title: 'Home',
            name: 'Sherlock Holmes',
            phone: '+90 555 55 55 55',
            zipCode: '340000',
            province: 'London',
            district: 'Marylebone',
            address: '221 Baker St, Marylebone',
            icon: 'home',
        },
        {
            id: '2',
            title: 'Office',
            name: 'Sherlock Holmes',
            phone: '+90 555 55 55 55',
            zipCode: '340000',
            province: 'London',
            district: 'Marylebone',
            address: '221 Baker St, Marylebone',
            icon: 'business',
        },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const openAddModal = () => {
        setIsEditing(false);
        setSelectedAddress(null);
        setModalVisible(true);
    };

    const openEditModal = (address) => {
        setIsEditing(true);
        setSelectedAddress(address);
        setModalVisible(true);
    };

 

    if (addresses.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Image source={require('../assets/images/no-address.png')} style={styles.emptyImage} />
                <Text style={styles.emptyTitle}>No Saved Address</Text>
                <Text style={styles.emptySubtitle}>You can save your address to use it all the time</Text>
                <TouchableOpacity style={styles.startShoppingButton}>
                    <Text style={styles.startShoppingText}>Add New Address</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleSaveAddress = (newAddress) => {
        if (isEditing) {
            setAddresses((prev) =>
                prev.map((addr) => (addr.id === selectedAddress.id ? newAddress : addr))
            );
        } else {
            setAddresses((prev) => [...prev, { ...newAddress, id: Date.now().toString() }]);
        }
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('explore2')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>My Addresses</Text>
                <TouchableOpacity onPress={openAddModal}>
                    <MaterialIcons name="add" size={24} color="#F24E61" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => openEditModal(item)}
                        style={styles.addressContainer}>
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

            <Modal visible={modalVisible} animationType="slide">
                <AddressForm
                    isEditing={isEditing}
                    address={selectedAddress}
                    onClose={() => setModalVisible(false)}
                    onSave={handleSaveAddress}
                />
            </Modal>
        </View>
    );
};

const AddressForm = ({ isEditing, address, onClose, onSave }) => {
    const [formData, setFormData] = useState(
        address || {
            title: '',
            name: '',
            phone: '',
            zipCode: '',
            province: '',
            district: '',
            address: '',
        }
    );

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.formContainer}>
                <View style={styles.header}>
                    <Text style={styles.formTitle}>{isEditing ? 'Edit Address' : 'New Address'}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <MaterialIcons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        onPress={(text) => handleChange('icon', "home")}
                        style={styles.typeButton}>
                        <MaterialIcons name="home" size={24} color="#FFF" />
                        <Text style={styles.typeText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={(text) => handleChange('icon', "business")}
                        style={styles.typeButton}>
                        <MaterialIcons name="business" size={24} color="#333" />
                        <Text style={styles.typeText}>Work</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={(text) => handleChange('icon', "location-on")}
                        style={styles.typeButton}>
                        <MaterialIcons name="location-on" size={24} color="#333" />
                        <Text style={styles.typeText}>Other</Text>
                    </TouchableOpacity>
                </View>
                <TextInput placeholder="Name Surname" value={formData.name} onChangeText={(text) => handleChange('name', text)} />
                <TextInput placeholder="Phone" value={formData.phone} onChangeText={(text) => handleChange('phone', text)} />
                <TextInput placeholder="Zip Code" value={formData.zipCode} onChangeText={(text) => handleChange('zipCode', text)} />
                <TextInput placeholder="Province" value={formData.province} onChangeText={(text) => handleChange('province', text)} />
                <TextInput placeholder="District" value={formData.district} onChangeText={(text) => handleChange('district', text)} />
                <TextInput placeholder="Address" value={formData.address} onChangeText={(text) => handleChange('address', text)} />
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>{isEditing ? 'Edit' : 'Add'}</Text>
                </TouchableOpacity>
                {isEditing && (
                    <TouchableOpacity style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9FB' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', marginTop: 50 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    addressContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    iconContainer: { width: 40, alignItems: 'center', marginRight: 10 },
    textContainer: { flex: 1 },
    addressTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    addressText: { fontSize: 14, color: '#666' },
    formContainer: { flex: 1, padding: 20, backgroundColor: '#FFF' },
    formTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
    buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    typeButton: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#F24E61', borderRadius: 5 },
    typeText: { color: '#FFF', marginLeft: 5 },
    saveButton: { backgroundColor: '#F24E61', padding: 15, alignItems: 'center', borderRadius: 10 },
    saveButtonText: { color: '#FFF', fontWeight: 'bold' },
    removeButton: { marginTop: 10, backgroundColor: '#EEE', padding: 15, alignItems: 'center', borderRadius: 10 },
    removeButtonText: { color: '#333' },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyImage: {
        width: 300,
        height: 200,
        resizeMode:'contain',
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
});

export default AddressScreen;
