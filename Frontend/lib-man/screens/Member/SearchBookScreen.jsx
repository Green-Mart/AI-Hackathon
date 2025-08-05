// screens/Member/SearchBooksScreen.jsx

import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const sampleBooks = [
  {
    id: '1',
    title: 'C Programming Language',
    author: 'Brian W. Kernighan & Dennis Ritchie',
    publication: 'Prentice Hall',
    rackNo: 'A1',
    availableCopies: 5
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    publication: 'Prentice Hall',
    rackNo: 'B2',
    availableCopies: 3
  },
  {
    id: '3',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    publication: 'O\'Reilly Media',
    rackNo: 'C3',
    availableCopies: 2
  },
  {
    id: '4',
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    publication: 'No Starch Press',
    rackNo: 'D4',
    availableCopies: 4
  }
];


const SearchBooksScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(sampleBooks);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = sampleBooks.filter(book =>
      book.title.toLowerCase().includes(text.toLowerCase()) ||
      book.author.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const goToBookDetails = (book) => {
    console.log('Navigating to book details:', book);
    navigation.navigate('Book Details', { book });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Books</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by title or author"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => goToBookDetails({item})}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>by {item.author}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noResult}>No books found.</Text>}
      />
    </View>
  );
};

export default SearchBooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  noResult: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});
