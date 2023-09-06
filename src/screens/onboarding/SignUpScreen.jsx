import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  // CheckBox,
  StyleSheet,
} from 'react-native';
import {CheckBox} from '@react-native-community/checkbox';
import {COLORS} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignUp = () => {
    // Reset errors
    setErrors({});

    // Input validation
    const errorsObj = {};
    if (!name) {
      errorsObj.name = 'Name is required';
    }
    if (!email) {
      errorsObj.email = 'Email is required';
    }
    if (!password) {
      errorsObj.password = 'Password is required';
    }
    if (password !== confirmPassword) {
      errorsObj.confirmPassword = 'Passwords do not match';
    }
    if (!termsAccepted) {
      errorsObj.termsAccepted = 'You must accept the terms and conditions';
    }

    // If there are errors, update state and return
    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
      return;
    }

    // Implement your sign-up logic here
    navigation.navigate('OTP');
    console.log('Signing up...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Name Input */}
      <Text style={styles.inputLabel}>
        Email <Text style={{color: COLORS.error}}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      {/* Terms and Conditions Checkbox */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={termsAccepted}
          onValueChange={newValue => setTermsAccepted(newValue)}
        />
        <Text style={styles.checkboxLabel}>
          I accept the terms and conditions
        </Text>
      </View>
      {errors.termsAccepted && (
        <Text style={styles.errorText}>{errors.termsAccepted}</Text>
      )}

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    width: '80%',
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUpScreen;
