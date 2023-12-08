import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../services/LoginService';

const LoginContent = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async () => {
    try {
      const result = await login(username, password);

      if (result) {
        // Redirect based on the user's role
        const userRole = result.user.rol;

        if (userRole === 'usuario' || userRole === 'administrador') {
          navigation.navigate('Home'); // Replace 'Home' with the appropriate screen name
        } else {
          setErrorMessage('Usuario o contraseña incorrecto');
        }
      } else {
        setErrorMessage('Usuario o contraseña incorrecto');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error durante el inicio de sesión');
    }
  };
  const navigateToRegistro = () => {
    navigation.navigate('Registro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={navigateToRegistro}>
        ¿No tienes cuenta? Regístrate aquí
      </Text>
      {/* Add the button or text for registration */}
      <TouchableOpacity style={styles.registerButton} onPress={navigateToRegistro}>
        <Text style={styles.registerButtonText}>No tienes cuenta, regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    marginTop: 16,
    color: '#3498db',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default LoginContent;