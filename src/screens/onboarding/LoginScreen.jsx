import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../../theme/theme';
import {useAuth} from '../../context/AuthContext';

const LoginScreen = () => {
  const {setLoggedIn} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    // Reset error messages
    setUsernameError('');
    setPasswordError('');

    // Input field validation
    if (!username) {
      setUsernameError('Username is required.');
    }
    if (!password) {
      setPasswordError('Password is required.');
    }

    // If no errors, implement your login logic here
    if (username && password) {
      // Implement your login logic here
      navigation.navigate('Home');
    }
    setLoggedIn(true);
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Chop n chill</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null}
        <Text style={styles.inputLabel}>
          Email <Text style={{color: COLORS.error}}>*</Text>
        </Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Email"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <Text style={styles.inputLabel}>
          Password <Text style={{color: COLORS.error}}>*</Text>
        </Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.passwordVisibilityButton}
            onPress={togglePasswordVisibility}>
            <FontAwesome
              name={showPassword ? 'eye-slash' : 'eye'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign-Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 100,
    fontFamily: FONTS.fontFamilyRegular,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: FONTS.fontFamilyRegular,
  },

  passwordInputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    fontFamily: FONTS.fontFamilyRegular,
    // backgroundColor: COLORS.background,
  },
  passwordInput: {
    flex: 1,
    height: 60,
    fontFamily: FONTS.fontFamilyRegular,
  },
  passwordVisibilityButton: {
    padding: 10,
  },
  button: {
    backgroundColor: COLORS.background,
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONTS.fontFamilyRegular,
  },
  forgotPasswordText: {
    color: COLORS.textMid,
    fontSize: 16,
    fontFamily: FONTS.fontFamilyRegular,
    marginBottom: 20,
  },
  inputContainer: {
    // backgroundColor: COLORS.background,
    // marginBottom: 20,
    fontFamily: FONTS.fontFamilyRegular,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: 'black', // Customize label color
    fontFamily: FONTS.fontFamilyRegular,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontFamily: FONTS.fontFamilyRegular,
  },
});

export default LoginScreen;
