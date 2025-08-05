import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Member/HomeScreen';
import SearchBooksScreen from '../screens/Member/SearchBookScreen';
import MyIssuedBooks from '../screens/Member/MyIssuedBooks';
import MyFinesScreen from '../screens/Member/MyFinesScreen';
import ProfileScreen from '../screens/Member/ProfileScreen';
import BookDetailsScreen from '../screens/Member/BookDetailsScreen';

const Tab = createBottomTabNavigator();

export default function MemberNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search Books" component={SearchBooksScreen} />
      <Tab.Screen name="Issued Books" component={MyIssuedBooks} />
      <Tab.Screen name="Fines" component={MyFinesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Book Details" component={BookDetailsScreen} />
    </Tab.Navigator>
  );
}
