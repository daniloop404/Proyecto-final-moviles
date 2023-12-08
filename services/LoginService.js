import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_USUARIOS = 'https://app-web-2-d5607-default-rtdb.firebaseio.com/usuarios';

export const login = async (username, password) => {
  try {
    const response = await axios.get(`${API_USUARIOS}.json`);
    const users = response.data;
    const keys = Object.keys(users);

    for (const key of keys) {
      const user = users[key];
      if (user.nombreUsuario === username && user.clave === password) {
        // Store user information and key in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('userKey', key);
        return { user, key };
      }
    }
    return null;
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Handle the error appropriately in your application
  }
};

export const logout = async () => {
  try {
    // Remove user information and key from AsyncStorage on logout
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('userKey');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error; // Handle the error appropriately in your application
  }
};

export const isAuthenticated = async () => {
  try {
    // Check if user information is present in AsyncStorage
    const userString = await AsyncStorage.getItem('user');
    return userString !== null;
  } catch (error) {
    console.error('Error during isAuthenticated check:', error);
    throw error; // Handle the error appropriately in your application
  }
};

export const getRole = async () => {
  try {
    // Get user information from AsyncStorage and extract role
    const userString = await AsyncStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user.rol;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error during getRole:', error);
    throw error; // Handle the error appropriately in your application
  }
};

export const getNombre = async () => {
  try {
    // Get user information from AsyncStorage and extract name
    const userString = await AsyncStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user.nombreUsuario;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error during getNombre:', error);
    throw error; // Handle the error appropriately in your application
  }
};

export const getUserKey = async () => {
  try {
    // Get user key from AsyncStorage
    return await AsyncStorage.getItem('userKey');
  } catch (error) {
    console.error('Error during getUserKey:', error);
    throw error; // Handle the error appropriately in your application
  }
};