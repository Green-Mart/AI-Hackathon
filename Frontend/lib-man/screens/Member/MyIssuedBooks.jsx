import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Sample issued books data
const sampleIssuedBooks = [
  {
    id: '1',
    title: 'C Programming Language',
    author: 'Brian W. Kernighan & Dennis Ritchie',
    issueDate: '2025-07-01',
    returnDate: '2025-07-15',
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    issueDate: '2025-07-10',
    returnDate: '2025-07-24',
  },
];

const MyIssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    // Simulate fetching from backend
    setIssuedBooks(sampleIssuedBooks);
  }, []);

  const renderBookItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.detail}>Author: {item.author}</Text>
      <Text style={styles.detail}>Issued On: {item.issueDate}</Text>
      <Text style={styles.detail}>Return By: {item.returnDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Issued Books</Text>
      {issuedBooks.length === 0 ? (
        <Text style={styles.emptyText}>You haven't issued any books yet.</Text>
      ) : (
        <FlatList
          data={issuedBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderBookItem}
        />
      )}
    </View>
  );
};

export default MyIssuedBooks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  detail: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
});
