import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthenticationScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Si deseas realizar una compra debes iniciar sesion o crear una cuenta</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Set the background color if needed
  },
  button: {
    backgroundColor: '#000000', // Set the button color to black
    marginTop: 10, // Adjust spacing between buttons if needed
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF', // Set the text color to white
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AuthenticationScreen;