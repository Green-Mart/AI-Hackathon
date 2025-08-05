import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;
    console.log(book)
  const isPaidUser = true; // mock flag for demo

  const handleIssueRequest = () => {
    if (!isPaidUser) {
      Alert.alert('Error', 'You need to be a paid member to issue books.');
    } else {
      Alert.alert('Success', 'Issue request submitted successfully.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{book.item.title}</Text>
      <Text style={styles.text}>Author: {book.item.author}</Text>
      <Text style={styles.text}>Publication: {book.item.publication}</Text>
      <Text style={styles.text}>Rack No: {book.item.rackNo}</Text>
      <Text style={styles.text}>Available Copies: {book.item.availableCopies}</Text>
      <Text style={styles.desc}>{book.item.description}</Text>

      <Button
        title="Request Issue"
        onPress={handleIssueRequest}
        disabled={!isPaidUser}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  desc: {
    fontSize: 14,
    marginVertical: 15,
    color: '#444',
  },
});

export default BookDetailsScreen;
