import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from '../../../components/screens/homeScreen';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
}