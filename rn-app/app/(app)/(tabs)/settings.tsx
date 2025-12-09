import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/ui/button';
import { useAuth } from '../../../context/authContext';

export default function Settings() {
  const { signOut } = useAuth();

  const handleLogOut = () => {
    signOut();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
      }}
    >
      <Text>Settings Screen</Text>
      <Button 
        title="Log Out" 
        onPress={handleLogOut}
        />
    </SafeAreaView>
  );
}