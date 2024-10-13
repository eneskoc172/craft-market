// lib/auth.js


// Oturum durumunu kontrol eden fonksiyon
export const checkAuthStatus = async () => {
  const token = false;
  return token ? true : false;
};

// Oturum açma fonksiyonu
export const login = async () => {
  await AsyncStorage.setItem('userToken', 'abc123'); // Örnek token
};

// Oturum kapama fonksiyonu
export const logout = async () => {
  await AsyncStorage.removeItem('userToken'); // Token'ı sil
};
