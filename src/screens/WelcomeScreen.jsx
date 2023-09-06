/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StatusBar, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../theme/theme';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    // Check if the user has already seen the welcome screen
    AsyncStorage.getItem('welcomeScreenShown').then(value => {
      if (value === null) {
        // If not seen before, animate the welcome screen
        ring1Padding.value = 0;
        ring2Padding.value = 0;
        setTimeout(
          () => withSpring((ring1Padding.value = ring1Padding.value + hp(5))),
          100,
        );
        setTimeout(
          () => withSpring((ring2Padding.value = ring2Padding.value + hp(5.5))),
          300,
        );
        // Set a flag to indicate that the welcome screen has been shown
        AsyncStorage.setItem('welcomeScreenShown', 'true');
      } else {
        // If the welcome screen has already been seen, reset the navigation stack
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}], // Navigate to the Login screen
          });
        }, 3000); // 3000 milliseconds (3 seconds)
      }
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar style="light" />
      <Animated.View
        style={{
          backgroundColor: '#fab341',
          borderRadius: 190,
          padding: ring2Padding,
        }}>
        <Animated.View
          style={{
            backgroundColor: '#ebd1a7',
            borderRadius: 190,
            padding: ring1Padding,
          }}>
          <Image
            source={require('../assets/ll.jpeg')}
            style={{width: wp(45), height: hp(19), borderRadius: 400}}
          />
        </Animated.View>
      </Animated.View>
      <View
        style={{
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: hp(4),
            fontFamily: FONTS.fontFamilyBold,
          }}>
          {'Chop n chill'}
        </Text>
        <Text
          style={{
            fontSize: hp(3),
            fontFamily: FONTS.fontFamilyThin,
          }}>
          Food is always right
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
