import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeContent';
import ProductosScreen from './screens/Productos';
import LoginContent from './screens/LoginContent';
import CarritoScreen from './screens/Carrito';
import DetalleProductoComponent from './screens/DetalleProducto'; 
import Registro from './screens/Registro';
import AuthenticationScreen from './screens/AuthenticationScreen'; 


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const tabBarIcons = {
  CeluQuito: () => <Ionicons name="home-outline" size={24} color="#000" />,
  Catalogo: () => <Ionicons name="list-outline" size={24} color="#000" />,
  Usuario: () => <Ionicons name="person-outline" size={24} color="#000" />,
  Carrito: () => <Ionicons name="cart-outline" size={24} color="#000" />,
};
const ProductosStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    
    <Stack.Screen name="Productos" component={ProductosScreen} />
    <Stack.Screen name="DetalleProducto" component={DetalleProductoComponent} />
  </Stack.Navigator>
);
const AuthenticationStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen name="Authentication" component={AuthenticationScreen} />
    <Stack.Screen name="Login" component={LoginContent} />
    <Stack.Screen name="Registro" component={Registro} />
  </Stack.Navigator>
);



const App = () => (
  <View style={styles.container}>
    <NavigationContainer>
    <Tab.Navigator
  screenOptions={{
    headerShown: false, // Hide the header
    tabBarLabel: () => null, // Hide the text labels
    tabBarActiveTintColor: "#000", // Set the color of the active icon
    tabBarInactiveTintColor: "#999", // Set the color of the inactive icon
    tabBarStyle: {
      backgroundColor: "#fff", // Set the background color of the tab bar
    },
  }}
>
  <Tab.Screen
    name="CeluQuito"
    component={HomeScreen}
    options={{ tabBarIcon: tabBarIcons.CeluQuito }}
  />
  <Tab.Screen
    name="Catalogo"
    component={ProductosStackScreen}
    options={{ tabBarIcon: tabBarIcons.Catalogo }}
  />
  <Tab.Screen
    name="Usuario"
    component={AuthenticationStackScreen}
    options={{ tabBarIcon: tabBarIcons.Usuario }}
  />
  <Tab.Screen
    name="Carrito"
    component={CarritoScreen}
    options={{ tabBarIcon: tabBarIcons.Carrito }}
  />
</Tab.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;