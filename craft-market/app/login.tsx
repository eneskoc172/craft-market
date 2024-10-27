import { Link, Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Giriş işlemleri
    console.log('Email:', email);
    console.log('Password:', password);
    // Giriş yapıldıktan sonra yönlendirme
    router.replace('/(tabs)')
  };
  return (

    <ThemedView style={styles.container}>
      <View style={{
        width: '100%',
        height: 800,
        backgroundColor: '#FF6347',
        position: 'relative',
        top: -200,
        borderBottomStartRadius: 250
      }}>
      </View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal:24,
        paddingVertical:24,
        borderRadius:24,
        position: 'relative',
        top: -300,
      }}>


        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => alert('Sign Up Pressed')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F5F5F5'

  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  input: {
    width: 300,
    height: 50,
    borderRadius: 25,
    paddingLeft: 15,
    marginVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    color: '#6c757d',
  },
  signupLink: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
});
