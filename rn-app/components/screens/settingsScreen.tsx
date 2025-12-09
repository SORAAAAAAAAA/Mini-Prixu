import React from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/authContext';
import Header from '../ui/header';
import Card from '../ui/card';
import Section from '../ui/section';
import Button from '../ui/button';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  const handleLogOut = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Log Out', onPress: signOut, style: 'destructive' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header 
        title="Settings" 
        subtitle="Manage your preferences"
      />

      <Section title="App Settings">
        <Card>
          <Text style={styles.settingTitle}>Notifications</Text>
          <Text style={styles.settingDescription}>Enable push notifications</Text>
        </Card>
        <Card>
          <Text style={styles.settingTitle}>Dark Mode</Text>
          <Text style={styles.settingDescription}>Switch to dark theme</Text>
        </Card>
      </Section>

      <Section title="Account">
        <Card>
          <Text style={styles.settingTitle}>Privacy</Text>
          <Text style={styles.settingDescription}>Manage your privacy settings</Text>
        </Card>
        <Card>
          <Text style={styles.settingTitle}>Security</Text>
          <Text style={styles.settingDescription}>Update password and security options</Text>
        </Card>
      </Section>

      <Section title="About">
        <Card>
          <Text style={styles.settingTitle}>Version</Text>
          <Text style={styles.settingDescription}>App version 1.0.0</Text>
        </Card>
      </Section>

      <View style={styles.logoutButtonContainer}>
        <Button 
          title="Log Out" 
          onPress={handleLogOut}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#999',
  },
  logoutButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
