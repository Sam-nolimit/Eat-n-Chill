/* eslint-disable react-native/no-inline-styles */
import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS} from '../theme/theme';
import Animated, {SlideInRight} from 'react-native-reanimated';
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './Loading';
import {CachedImage} from '../helpers/Image';
import {useNavigation} from '@react-navigation/native';

const Recipe = ({categories, meals}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingVertical: 5,
        marginVertical: 5,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        borderRadius: 20,
      }}>
      <Text style={{fontSize: hp(3), fontFamily: FONTS.fontFamilyBold}}>
        Recipe
      </Text>
      {categories.length === 0 || meals.length === 0 ? (
        <Loading size="large" style={{marginTop: 50}} />
      ) : (
        <MasonryList
          data={meals}
          keyExtractor={item => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => (
            <RecipeCard item={item} index={i} navigation={navigation} />
          )}
          //   refreshing={isLoadingNext}
          //   onRefresh={() => refetch({first: ITEM_CNT})}
          onEndReachedThreshold={0.1}
          //   onEndReached={() => loadNext(ITEM_CNT)}
        />
      )}
    </View>
  );
};

export default Recipe;

const RecipeCard = ({item, index, navigation}) => {
  let isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={SlideInRight.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}>
      <Pressable
        style={{
          //   height: hp(30),
          borderRadius: 35,
          paddingLeft: isEven ? 0 : 4,
          paddingRight: isEven ? 4 : 0,
          margin: 5,
          //   backgroundColor: 'green',
        }}
        onPress={() => navigation.navigate('RecipeDetail', {...item})}>
        {/* <Image
          source={{uri: item.strMealThumb}}
          style={{
            width: '100%',
            height: index % 3 === 0 ? hp(20) : hp(30),
            borderRadius: 35,
          }}
        /> */}
        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: '100%',
            height: index % 3 === 0 ? hp(20) : hp(30),
            borderRadius: 35,
            // backgroundColor: 'grey',
          }}
          sharedTransitionTag={item.strMeal}
        />
      </Pressable>
      <Text
        style={{
          fontFamily: FONTS.fontFamilyRegular,
          fontSize: hp(1.8),
          alignSelf: 'center',
        }}>
        {item.strMeal.length > 10
          ? `${item.strMeal.slice(0, 15)}...`
          : item.strMeal}
      </Text>
    </Animated.View>
  );
};
