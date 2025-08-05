// /screens/Member/MyFinesScreen.jsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function MyFinesScreen() {
  const fines = [
    { id: '1', book: '1984', amount: 50 },
    { id: '2', book: 'Atomic Habits', amount: 30 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Fines</Text>
      <FlatList
        data={fines}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.bookTitle}>{item.book}</Text>
            <Text>Fine: ₹{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#f2f2f2', padding: 10, marginBottom: 10, borderRadius: 5 },
  bookTitle: { fontWeight: 'bold' }
});
