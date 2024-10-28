import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo, Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

function ProfileOption({
  icon,
  label,
  rightText,
  isSwitch,
  switchValue,
  onSwitchToggle,
  iconType = 'MaterialIcons',
  onPress=null
}) {
  const IconComponent = iconType === 'FontAwesome'
    ? FontAwesome
    : iconType === 'Entypo'
    ? Entypo
    : iconType === 'Ionicons'
    ? Ionicons
    : iconType === 'Feather'
    ? Feather
    : MaterialIcons;

  return (
    <TouchableOpacity 
    onPress={onPress}
    style={styles.optionContainer}>
      <View style={styles.optionLeft}>
        <IconComponent name={icon} size={24} color="#808080" />
        <Text style={styles.optionText}>{label}</Text>
      </View>
      {isSwitch ? (
        <Switch value={switchValue} onValueChange={onSwitchToggle} />
      ) : (
        <View style={styles.optionRight}>
          {rightText && <Text style={styles.rightText}>{rightText}</Text>}
          <MaterialIcons name="chevron-right" size={24} color="#808080" />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled(!isNotificationsEnabled);
  const toggleDarkMode = () => setIsDarkModeEnabled(!isDarkModeEnabled);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text style={styles.sectionHeader}>Account</Text>
      <ProfileOption icon="person" label="Edit Profile" onPress={()=>router.replace('edit-profile')}/>
      <ProfileOption icon="vpn-key" label="Change Password" onPress={()=>router.replace('change-password')}/>

      <Text style={styles.sectionHeader}>General</Text>
      <ProfileOption icon="box" label="Orders" iconType="Feather" onPress={()=>router.replace('orders')}/>
      <ProfileOption icon="heart" label="Favorites" iconType="FontAwesome" />
      <ProfileOption icon="location-pin" label="My Addresses" iconType="Entypo" />
      <ProfileOption icon="credit-card" label="My Cards" iconType="FontAwesome" />

      <Text style={styles.sectionHeader}>App Settings</Text>
      <ProfileOption
        icon="notifications"
        label="Notifications"
        isSwitch
        switchValue={isNotificationsEnabled}
        onSwitchToggle={toggleNotifications}
      />
      <ProfileOption
        icon="moon"
        label="Dark Mode"
        isSwitch
        switchValue={isDarkModeEnabled}
        onSwitchToggle={toggleDarkMode}
        iconType="Ionicons"
      />
      <ProfileOption icon="language" label="Language" rightText="English" iconType="FontAwesome" />
      <ProfileOption icon="exit-to-app" label="Logout" iconType="MaterialIcons" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6347',
    marginTop: 20,
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#808080',
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 16,
    color: '#808080',
    marginRight: 5,
  },
});
