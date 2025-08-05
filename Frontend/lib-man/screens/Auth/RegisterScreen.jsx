// screens/Register.jsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../../utils/api'; // <-- Centralized API

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwd, setPasswd] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !phone || !passwd) {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    const userData = { name, email, phone, passwd };

    try {
      const res = await registerUser(userData); 
      console.log(res); // call from authApi.js
      if (res.data.status === 'success') {
        Alert.alert('Registration Successful', 'You can now log in');
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration Failed', res.error || 'Unknown error');
      }
    } catch (err) {
      Alert.alert('Error', err.toString());
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" style={styles.input} onChangeText={setName} value={name} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput placeholder="Phone" style={styles.input} onChangeText={setPhone} value={phone} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPasswd} value={passwd} />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { marginBottom: 12, borderBottomWidth: 1, padding: 8 },
  link: { marginTop: 12, color: 'blue', textAlign: 'center' }
});
