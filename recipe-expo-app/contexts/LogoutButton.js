import React from 'react';
import { Button } from 'react-native';
import { useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutButton = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    // Perform any additional cleanup or API calls on logout if needed
    await AsyncStorage.removeItem('favorites');
    setImage(null);
    logout();
  };

  return (
    <Button title="Logout" onPress={handleLogout} disabled={!isLoggedIn} />
  );
};

export default LogoutButton;
