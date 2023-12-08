import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { isAuthenticated } from '../services/LoginService';

const NoAuthGuard = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();

      if (authenticated) {
        // If user is already authenticated, redirect to home or another page
        navigation.navigate('Home'); // You can change this to the desired redirect route
      } else {
        // If user is not authenticated, redirect to the AuthenticationScreen
        navigation.navigate('Authentication');
      }
    };

    checkAuthentication();
  }, [navigation]);

  return null;
};

export default NoAuthGuard;