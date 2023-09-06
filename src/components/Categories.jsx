/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CategoriesData} from '../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../theme/theme';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {CachedImage} from '../helpers/Image';

const Categories = ({categories, activeCategory, handleChangeCategories}) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 20,
      }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 5,
          paddingVertical: 10,
        }}>
        {categories.map((item, index) => {
          let isActive = item.strCategory === activeCategory;
          let activeClassButton = isActive ? COLORS.background : 'white';
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategories(item.strCategory)}
              style={{
                backgroundColor: activeClassButton,
                borderRadius: 20,
                padding: 10,
                marginHorizontal: 5,
                // width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 100,
                  //   backgroundColor: 'red',
                }}>
                <CachedImage
                  uri={item.strCategoryThumb}
                  style={{
                    width: widthPercentageToDP(25),
                    height: heightPercentageToDP(15),
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 16,
                  fontFamily: FONTS.fontFamilyRegular,
                  color: 'black',
                }}>
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* <Text>Categories</Text> */}
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
