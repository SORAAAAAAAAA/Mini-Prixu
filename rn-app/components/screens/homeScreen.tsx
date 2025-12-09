import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Header from '../ui/header';
import Card from '../ui/card';
import Section from '../ui/section';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header 
        title="Home" 
        subtitle="Welcome back!"
      />

      <Section title="Quick Stats">
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card>
        </View>
      </Section>

      <Section title="Recent Activity">
        <Card>
          <Text style={styles.activityTitle}>Latest Update</Text>
          <Text style={styles.activityText}>
            You completed a task earlier today
          </Text>
        </Card>
        <Card>
          <Text style={styles.activityTitle}>System Status</Text>
          <Text style={styles.activityText}>
            All systems operating normally
          </Text>
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  activityText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
