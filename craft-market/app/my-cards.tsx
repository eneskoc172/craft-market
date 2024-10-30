import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const MyCardsScreen = () => {
  const [cards, setCards] = useState([
    { id: '1', name: 'My Card', lastDigits: '8342', brand: 'Mastercard' },
    { id: '2', name: 'My Troy Card', lastDigits: '2312', brand: 'Troy' }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddCard = () => {
    setSelectedCard(null); // Yeni kart eklemek için
    setModalVisible(true);
  };

  const handleEditCard = (card) => {
    setSelectedCard(card); // Seçili kartı düzenlemek için
    setModalVisible(true);
  };

  const handleSaveCard = (newCard) => {
    if (selectedCard) {
      // Düzenleme modunda
      setCards(cards.map(card => card.id === selectedCard.id ? newCard : card));
    } else {
      // Yeni kart ekleme modunda
      setCards([...cards, { ...newCard, id: Date.now().toString() }]);
    }
    setModalVisible(false);
  };

  const handleRemoveCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
    setModalVisible(false);
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.cardItem} onPress={() => handleEditCard(item)}>
      <Text style={styles.cardBrand}>{item.brand}</Text>
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardLastDigits}>**** **** **** {item.lastDigits}</Text>
      <Ionicons name="chevron-forward" size={24} color="gray" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('explore2')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>My Addresses</Text>
                <TouchableOpacity onPress={handleAddCard}>
                    <MaterialIcons name="add" size={24} color="#F24E61" />
                </TouchableOpacity>
            </View>

      {cards.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="card" size={100} color="#E24E61" />
          <Text style={styles.emptyText}>No Saved Card</Text>
          <Text style={styles.emptySubText}>You can save your card info to make purchase easier, faster.</Text>
        </View>
      ) : (
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.cardList}
        />
      )}

      <CardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveCard}
        onRemove={selectedCard ? () => handleRemoveCard(selectedCard.id) : null}
        card={selectedCard}
      />
    </View>
  );
};

const CardModal = ({ visible, onClose, onSave, onRemove, card }) => {
  const [cardNumber, setCardNumber] = useState(card ? card.cardNumber : '');
  const [expiryDate, setExpiryDate] = useState(card ? card.expiryDate : '');
  const [ccv, setCcv] = useState(card ? card.ccv : '');

  const handleSave = () => {
    const newCard = {
      id: card ? card.id : Date.now().toString(),
      name: card ? card.name : 'New Card',
      lastDigits: cardNumber.slice(-4),
      brand: cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      cardNumber,
      expiryDate,
      ccv
    };
    onSave(newCard);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{card ? 'Edit Card' : 'New Card'}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              placeholder="Expiry Date"
              value={expiryDate}
              onChangeText={setExpiryDate}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="CCV"
              value={ccv}
              onChangeText={setCcv}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{card ? 'Edit' : 'Add'}</Text>
          </TouchableOpacity>
          {card && (
            <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center',marginTop:50 },
  title: { fontSize: 22, fontWeight: 'bold' },
  cardItem: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#EEE' },
  cardBrand: { fontSize: 16, fontWeight: 'bold', color: '#E24E61', marginRight: 10 },
  cardName: { fontSize: 16, flex: 1 },
  cardLastDigits: { fontSize: 16, color: '#666' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 10 },
  emptySubText: { color: '#666', textAlign: 'center', marginHorizontal: 30, marginTop: 5 },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  input: { borderBottomWidth: 1, borderColor: '#EEE', paddingVertical: 8, marginBottom: 15 },
  inputRow: { flexDirection: 'row' },
  saveButton: { backgroundColor: '#E24E61', padding: 15, alignItems: 'center', borderRadius: 10, marginVertical: 10 },
  saveButtonText: { color: '#FFF', fontWeight: 'bold' },
  removeButton: { backgroundColor: '#EEE', padding: 15, alignItems: 'center', borderRadius: 10 },
  removeButtonText: { color: '#333' },
});

export default MyCardsScreen;
