import React, { useContext } from 'react';
import AuthNavigator from './AuthNavigator';
import MemberNavigator from './MemberNavigator';
import { AuthContext } from '../context/AuthContext';

export default function AppNavigator() {
  const { user } = useContext(AuthContext);
  return user ? <MemberNavigator /> : <AuthNavigator />;
}
