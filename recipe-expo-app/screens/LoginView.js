import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function LoginView({ navigation }) {
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Initialize error state

  const handleLogin = async () => {
    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await axios.post('https://jwt-postgre-tes.onrender.com/auth/login', userData);
          console.log(response);
    
      
      const token = response.data.token;

      console.log('Login successful. Token:', token);
      login(token);

      navigation.navigate('Back');

    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // outside the range of 2xx
        console.error('Server responded with an error:', error.response.status, error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error during login:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Submit" onPress={handleLogin} color="#3498db" />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginView;
