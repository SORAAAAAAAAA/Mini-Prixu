import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileScreen from '../../../components/screens/profileScreen';

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileScreen />
    </SafeAreaView>
  );
}