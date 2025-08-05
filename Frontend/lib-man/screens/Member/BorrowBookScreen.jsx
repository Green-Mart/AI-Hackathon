// /screens/Member/BorrowBookScreen.jsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function BorrowBookScreen({ route, navigation }) {
  const { book } = route.params;

  const handleBorrow = () => {
    // Call API to borrow book
    alert(`You borrowed ${book.title}`);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Borrow Book</Text>
      <Text>Title: {book.title}</Text>
      <Text>Author: {book.author}</Text>
      <Button title="Confirm Borrow" onPress={handleBorrow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});
