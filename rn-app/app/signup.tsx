import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useAuth } from '../context/authContext';
import { styles } from '../styles/Signin';
import { isValidEmail, isValidPassword, isNonEmptyString } from '../validators/authValidator';

export default function SignUp() {
  
  const { signUp } = useAuth(); // Get the signUp function from context 
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {

    // Validate Input 
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isValidPassword(password)) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (!isNonEmptyString(name)) {
      alert('Name cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      // Call signUp from context
      const userData = { name, email, password };
      await signUp(userData); 
      setLoading(false);
    } catch (error: any) {
      setSignupError(error.message);
    }
  
    if (signupError) {
      alert(signupError);
      return;
    }
    
  };

  return (
    loading ? (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'white'
        }}
      >
        <ActivityIndicator size="large" color="#edaa18" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>Creating your account...</Text>
      </SafeAreaView>
    ) : (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>Join now and get your Business ready for rewards.</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              {/* Link back to Sign In */}
              <Link href="/signin" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
          
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  );
}