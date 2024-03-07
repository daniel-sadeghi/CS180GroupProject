import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function SignUpView({ navigation }) {
  const { isLoggedIn, login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [validEmail, setValidEmail] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [token, setToken] = useState(null);

  const validatePassword = (password) => {
    // Validate password complexity (e.g., at least one uppercase, one digit, and one special character)
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setValidPassword(passwordPattern.test(password));
  };

  const handleChangeEmail = (text) => {
    setEmail(text);
    setValidEmail(isValidEmail(text));
  };

  function isValidEmail(email) {
    if (!email) {
      // Empty input, consider it valid
      return true;
  }
  const emailPattern = /^\S+@\S+\.\S+$/;
  return emailPattern.test(email);
  }

  const handleSignup = async () => {
    try {
      // Validate that none of the fields are blank
      if (!username || !email || !password) {
        console.error('Please fill in all fields.');
        return; // Exit early if any field is blank
      }
      if (!validPassword || password !== confirmPassword) {
        console.error('Invalid password or passwords do not match.');
        return;
      }
      const userData = {
        name: username,
        email: email,
        password: password,
      };
          const response = await axios.post('https://jwt-postgre-tes.onrender.com/auth/register', userData);
          console.log(response);
    
      
          const token = response.data.token;

          // Save the token in your app's state, context, or storage
          // For example, you can use AsyncStorage in Expo for local storage
          // AsyncStorage.setItem('token', token);
        
          console.log('Registration successful. Token:', token);
          //   //await AsyncStorage.setItem('token', receivedToken); // Save the token
          //   setToken(receivedToken); // Update the token state
          //   navigation.navigate('Home');
          // } else {
          //   console.error('Registration failed');
          // }
          login(token);
          await AsyncStorage.addItem('favorites');

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
        console.error('Error during registration:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleChangeEmail}
        keyboardType="email-address"
      />
      {validEmail ? null : <Text style={{ color: 'red', paddingBottom: 10 }}>Invalid email</Text>}
      <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => {
                    setPassword(text);
                    validatePassword(text);
                }}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
            />
            {!validPassword && (
                <Text style={{ color: 'red' }}>
                    Password must contain at least 8 characters, including an uppercase letter, a digit, and a special character.
                </Text>
            )}
            {password !== confirmPassword && (
                <Text style={{ color: 'red' }}>Passwords do not match.</Text>
            )}
      <Button
        title="Submit"
        onPress={handleSignup} // Call handleSignup on button press
        color="#3498db"
      />
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
    textAlign: 'center',
  },
});

export default SignUpView;
