import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsScreen from '../../../components/screens/settingsScreen';

export default function Settings() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SettingsScreen />
    </SafeAreaView>
  );
}