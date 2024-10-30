import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { checkAuthStatus } from '../lib/auth'; 

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(null); // Oturum durumu
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkAuthStatus(); // Oturum durumu kontrol fonksiyonu
      setIsLoggedIn(loggedIn);

      if (!loggedIn) {
        router.replace('/login'); // Eğer giriş yapılmamışsa login ekranına yönlendirme
      } else {
        SplashScreen.hideAsync(); // Oturum açılmışsa splash ekranını gizle
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null; // Oturum durumu yüklenirken boş bir ekran göster
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="login">
       
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" 
        options={{ headerShown: false }}
       />
          <Stack.Screen name="product-deail" 
        options={{ headerShown: false }}
       />
          <Stack.Screen name="edit-profile" 
        options={{ headerShown: false }}
       />
          <Stack.Screen name="change-password" 
        options={{ headerShown: false }}
       />
         <Stack.Screen name="orders" 
        options={{ headerShown: false }}
       />
        <Stack.Screen name="order-detail" 
        options={{ headerShown: false }}
       />
         <Stack.Screen name="favorites" 
        options={{ headerShown: false }}
       />
           <Stack.Screen name="address" 
        options={{ headerShown: false }}
       />
        <Stack.Screen name="my-cards" 
        options={{ headerShown: false }}
       />
        <Stack.Screen name="+not-found"  options={{ headerShown: false }}/>
      </Stack>
      </ThemeProvider>
  );
}
