import React from 'react';
import { Button } from 'react-native';
import { useAuth } from './AuthContext';

const LogoutButton = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    // Perform any additional cleanup or API calls on logout if needed
    logout();
  };

  return (
    <Button title="Logout" onPress={handleLogout} disabled={!isLoggedIn} />
  );
};

export default LogoutButton;
