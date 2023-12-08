import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthenticationScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Si deseas realizar una compra debes iniciar sesion o crear una cuenta</Text>
      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('Registro')}
      />
    </View>
  );
};

export default AuthenticationScreen;