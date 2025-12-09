// src/config.ts
import { Platform } from 'react-native';

const LOCAL_IP = process.env.EXPO_PUBLIC_LOCAL_IP; 
const PORT = process.env.EXPO_PUBLIC_PORT;

const getBaseUrl = () => {
  if (Platform.OS === 'android' && !Platform.isTV) {
    // If running on Android Emulator (not physical device)
    // return 'http://10.0.2.2:3000'; 
    
    // If running on Physical Android Device
    return `http://${LOCAL_IP}:${PORT}`;
  }
  
  if (Platform.OS === 'ios') {
    // iOS Simulator can usually read localhost
    return `http://${LOCAL_IP}:${PORT}`;
  }
  
  return `http://${LOCAL_IP}:${PORT}`;
};

export const API_URL = getBaseUrl();