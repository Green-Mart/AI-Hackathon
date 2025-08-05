import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../utils/api'; // Adjust the path if needed

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

  const handleLogin = async () => {
    if (!email || !passwd) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    try {
      const res = await loginUser(email, passwd);

      if (res.status === 'success') {
        const { token, id, name, role } = res.data;

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', id.toString());
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('role', role);

        Alert.alert('Login Success', `Welcome ${name}`);
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', res.error || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error('Login Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPasswd}
        value={passwd}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  heading: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    padding: 8,
  },
  link: {
    marginTop: 12,
    color: 'blue',
    textAlign: 'center',
  },
});
