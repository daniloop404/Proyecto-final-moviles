import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { isAuthenticated, getRole } from '../services/LoginService';

const UsuarioAuthGuard = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();

      if (authenticated) {
        const userRole = await getRole();

        if (userRole && userRole.toLowerCase() === 'usuario') {
          // User is a regular user, allow access to usuario-only routes
          // You can proceed with the navigation or set state accordingly
        } else {
          // Redirect to the AuthenticationScreen for other roles or users without a role
          navigation.navigate('Authentication');
        }
      } else {
        // Redirect to the AuthenticationScreen if not authenticated
        navigation.navigate('Authentication');
      }
    };

    checkAuthentication();
  }, [navigation]);

  return null;
};


export default UsuarioAuthGuard;