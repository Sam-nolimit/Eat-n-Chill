/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {COLORS} from '../theme/theme';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const NotificationScreen = props => {
  let item = props.route.params;
  //   console.log(props.route.params);
  return (
    <ScrollView
      styles={{
        backgroundColor: COLORS.background,
        flex: 1,
      }}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}>
      <StatusBar style={'light'} />

      <View
        style={{
          width: 'full',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          paddingTop: 50,
          paddingLeft: 15,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 100,
            padding: 5,
            elevation: 5,
          }}
          onPress={() => props.navigation.goBack()}>
          <ChevronLeftIcon
            color={COLORS.background}
            size={heightPercentageToDP(3.5)}
            strokeWidth={4.5}
            style={{}}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default NotificationScreen;
