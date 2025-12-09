import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Header from '../ui/header';
import Card from '../ui/card';
import Section from '../ui/section';
import {getUserData} from '../../data/userData';


export default function ProfileScreen() {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const loadUserData = async () => {
            const data = await getUserData();
            setUserData(data);
            console.log(data);
        };
        
        loadUserData();
    }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header 
        title="Profile" 
        subtitle="Your account information"
      />

      <View style={styles.profileAvatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userData?.name ? userData.name.charAt(0) : ''}</Text>
        </View>
      </View>

      <Section title="Account Details">
        <Card>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{userData?.name || 'John Doe'}</Text>
        </Card>
        <Card>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userData?.email || 'john.doe@example.com'}</Text>
        </Card>
        <Card>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{userData?.phone || '+1 (555) 123-4567'}</Text>
        </Card>
      </Section>

      <Section title="Preferences">
        <Card>
          <Text style={styles.label}>Theme</Text>
          <Text style={styles.value}>Light Mode</Text>
        </Card>
        <Card>
          <Text style={styles.label}>Notifications</Text>
          <Text style={styles.value}>Enabled</Text>
        </Card>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  profileAvatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  label: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
