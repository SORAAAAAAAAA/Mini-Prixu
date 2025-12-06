import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/authContext'; 
import { StatusBar } from 'expo-status-bar';

// 1. This is the "Bouncer" (The Guard Logic)
// It only cares about checking if the user is allowed here.
function RootLayoutNav() {
  const { session } = useAuth()!;
  const router = useRouter();

  useEffect(() => {
  const timer = setTimeout(() => {
    if (!session) {
      router.replace('/');
    } else if (session) {
      router.replace('/(app)/(tabs)/home');
    }
  }, 10000); // 10000ms delay

  return () => clearTimeout(timer);
}, [session]);

  return (
    <Slot />
  );
}


// 2. This is the "Main Gate" (The Root Export)
// Its ONLY job is to wrap the Bouncer with the Backpack (Provider).
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}