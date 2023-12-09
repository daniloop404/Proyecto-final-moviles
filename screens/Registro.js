import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postUsuario, checkUsernameExists, checkEmailExists } from '../services/UsuariosService';

const Registro = () => {
  const navigation = useNavigation();
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombreUsuario: '',
    clave: '',
    rol: 'usuario',
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
  });
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const onSubmit = () => {
    // Check if the form is valid and if both username and email are unique
    if (!usernameExists && !emailExists) {
      postUsuario(nuevoUsuario)
        .then((response) => {
          console.log('Usuario registrado:', response.data);

          // Show success message to the user
          alert('Usuario registrado exitosamente, ahora puedes iniciar sesión');

          // Optionally, you can reset the form here
          setNuevoUsuario({
            nombreUsuario: '',
            clave: '',
            rol: 'usuario',
            nombre: '',
            direccion: '',
            telefono: '',
            correo: '',
          });

          // Redirect to the login page
          navigation.navigate('Login');
        })
        .catch((error) => {
          console.error('Error al registrar usuario:', error);
        });
    }
  };

  const checkUsername = () => {
    console.log('Checking username:', nuevoUsuario.nombreUsuario);
    checkUsernameExists(nuevoUsuario.nombreUsuario)
      .then((exists) => {
        console.log('Username exists:', exists);
        setUsernameExists(exists);
      })
      .catch((error) => {
        console.error('Error checking username:', error);
      });
  };

  const checkEmail = () => {
    console.log('Checking email:', nuevoUsuario.correo);
    checkEmailExists(nuevoUsuario.correo)
      .then((exists) => {
        console.log('Email exists:', exists);
        setEmailExists(exists);
      })
      .catch((error) => {
        console.error('Error checking email:', error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Formulario de Registro</Text>

        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre de Usuario:</Text>
            <TextInput
              style={styles.input}
              value={nuevoUsuario.nombreUsuario}
              onChangeText={(value) => setNuevoUsuario({ ...nuevoUsuario, nombreUsuario: value })}
              onBlur={checkUsername}
              required
            />
            {usernameExists && <Text style={styles.errorText}>Este nombre de usuario ya está en uso.</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Correo Electrónico:</Text>
            <TextInput
              style={styles.input}
              value={nuevoUsuario.correo}
              onChangeText={(value) => setNuevoUsuario({ ...nuevoUsuario, correo: value })}
              onBlur={checkEmail}
              keyboardType="email-address"
              required
            />
            {emailExists && <Text style={styles.errorText}>Este correo electrónico ya está registrado.</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={nuevoUsuario.nombre}
              onChangeText={(value) => setNuevoUsuario({ ...nuevoUsuario, nombre: value })}
              required
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Dirección:</Text>
            <TextInput
              style={styles.input}
              value={nuevoUsuario.direccion}
              onChangeText={(value) => setNuevoUsuario({ ...nuevoUsuario, direccion: value })}
              required
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Teléfono:</Text>
            <TextInput
              style={styles.input}
              value={nuevoUsuario.telefono}
              onChangeText={(value) => setNuevoUsuario({ ...nuevoUsuario, telefono: value })}
              keyboardType="phone-pad"
              required
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Clave:</Text>
            <TextInput
              style={styles.input}
              value={nuevoUsuario.clave}
              onChangeText={(value) => setNuevoUsuario({ ...nuevoUsuario, clave: value })}
              secureTextEntry
              required
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={usernameExists || emailExists}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

         

          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            ¿Ya tienes cuenta? Presiona aquí
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  errorText: {
    color: 'rgb(204, 109, 109)',
    marginTop: 5,
  },
  successMessage: {
    color: 'rgb(34, 92, 34)',
    marginTop: 5,
  },
  errorMessage: {
    color: 'rgb(204, 109, 109)',
    marginTop: 5,
  },
  link: {
    textAlign: 'center',
    marginTop: 10,
    color: '#000000',
  },
});

export default Registro;