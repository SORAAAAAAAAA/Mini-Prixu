import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';

export default function SignIn() {
  return (
    <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'white'
          }}
        >
          <Text>Sign In</Text>
          <Button onPress={() => alert('Button pressed!')} title="Sign In" />
          
        </SafeAreaView>
  );
}