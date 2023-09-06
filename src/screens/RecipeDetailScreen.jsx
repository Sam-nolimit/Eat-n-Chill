/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {COLORS, FONTS} from '../theme/theme';
import {CachedImage} from '../helpers/Image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {
  ClockIcon,
  FireIcon,
  HeartIcon,
  Square3Stack3DIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import axios from 'axios';
import Loading from '../components/Loading';
// import {WebView} from 'react-native-webview';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
// import YoutubePlayer from 'react-native-youtube-iframe';

const RecipeDetailScreen = props => {
  const [isLiked, setIsLiked] = useState(false);
  const [meals, setMeals] = useState(null);
  const heartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  // const [playing, setPlaying] = useState(false);

  let item = props.route.params;
  //   console.log(props.route.params);
  const handleLikesIcon = () => {
    setIsLiked(!isLiked);
    if (heartRef.current) {
      heartRef.current.pulse(1000);
    }
  };

  useEffect(() => {
    // console.log('useEffect triggered'); // Add this line
    getMealData(item.idMeal);
  }, [item]);

  const getMealData = async id => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      if (response && response.data) {
        setMeals(response.data.meals[0]);
        console.log('first,', response?.data?.meals);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const checkingredients = meal => {
    if (!meal) {
      return [];
    }
    let indexes = [];
    for (let i = 0; i < 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = url => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // const onStateChange = useCallback(state => {
  //   if (state === 'ended') {
  //     setPlaying(false);
  //     Alert.alert('video has finished playing!');
  //   }
  // }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying(prev => !prev);
  // }, []);
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
      <StatusBar barStyle="dark-content" />
      {/* <Text>RecipeDetailScreen</Text> */}
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <CachedImage
          uri={item.strMealThumb}
          style={{
            // margin: 5,
            width: wp(100),
            height: hp(45),
            // borderButtonLeftRadius: 40
            // borderRadius: 23,
          }}
          sharedTransitionTag={item.strMeal}
        />
      </View>
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          paddingTop: 50,
          paddingHorizontal: 15,
          //   backgroundColor: 'red',
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
            size={hp(3.5)}
            strokeWidth={4.5}
            style={{}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 100,
            padding: 5,
            elevation: 5,
          }}
          onPress={handleLikesIcon}>
          <HeartIcon
            // color={COLORS.background}
            color={isLiked ? 'red' : 'grey'}
            size={hp(3.5)}
            strokeWidth={4.5}
            style={{}}
          />
        </TouchableOpacity>
      </Animated.View>
      <View>
        {loading ? (
          <Loading size={'large'} />
        ) : (
          <View
            style={{
              paddingHorizontal: 4,
              flex: 1,
              // backgroundColor: 'red',
              justifyContent: 'space-between',
              paddingTop: 8,
            }}>
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
              style={{marginHorizontal: 30}}>
              <Text
                style={{
                  fontSize: hp(3.5),
                  fontFamily: FONTS.fontFamilyBold,
                }}>
                {meals?.strMeal}
              </Text>
              <Text
                style={{
                  fontSize: hp(2.8),
                  fontFamily: FONTS.fontFamilyThin,
                }}>
                {meals?.strArea}
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(12)}
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View
                style={{
                  borderRadius: 100,
                  padding: 8,
                  backgroundColor: '#FFD54F',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    height: hp(6.5),
                    width: wp(10.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: 'white',
                  }}>
                  <ClockIcon
                    color={COLORS.background}
                    size={hp(5)}
                    strokeWidth={2.5}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: hp(2.5),
                      fontFamily: FONTS.fontFamilyBold,
                    }}>
                    35
                  </Text>
                  <Text
                    style={{fontSize: hp(2), fontFamily: FONTS.fontFamilyThin}}>
                    Mins
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderRadius: 100,
                  padding: 8,
                  backgroundColor: '#FFD54F',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                }}>
                <View
                  style={{
                    height: hp(6.5),
                    width: wp(10.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: 'white',
                  }}>
                  <UserIcon
                    color={COLORS.background}
                    size={hp(5)}
                    strokeWidth={2.5}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: hp(2.5),
                      fontFamily: FONTS.fontFamilyBold,
                    }}>
                    03
                  </Text>
                  <Text
                    style={{fontSize: hp(2), fontFamily: FONTS.fontFamilyThin}}>
                    Servings
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderRadius: 100,
                  padding: 8,
                  backgroundColor: '#FFD54F',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                }}>
                <View
                  style={{
                    height: hp(6.5),
                    width: wp(10.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: 'white',
                  }}>
                  <FireIcon
                    color={COLORS.background}
                    size={hp(5)}
                    strokeWidth={2.5}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: hp(2.5),
                      fontFamily: FONTS.fontFamilyBold,
                    }}>
                    103
                  </Text>
                  <Text
                    style={{fontSize: hp(2), fontFamily: FONTS.fontFamilyThin}}>
                    Calories
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderRadius: 100,
                  padding: 8,
                  backgroundColor: '#FFD54F',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                }}>
                <View
                  style={{
                    height: hp(6.5),
                    width: wp(10.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: 'white',
                  }}>
                  <Square3Stack3DIcon
                    color={COLORS.background}
                    size={hp(5)}
                    strokeWidth={2.5}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: hp(2.5),
                      fontFamily: FONTS.fontFamilyBold,
                    }}>
                    103
                  </Text>
                  <Text
                    style={{fontSize: hp(2), fontFamily: FONTS.fontFamilyThin}}>
                    Easy
                  </Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(700)
                .springify()
                .damping(12)}
              style={{
                paddingHorizontal: 10,
                marginTop: 10,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontFamily: FONTS.fontFamilyBold,
                  fontSize: hp(4),
                  paddingVertical: 10,
                  paddingLeft: hp(12),
                  // alignItems: 'center',
                }}>
                Ingredient
              </Text>
              <View
                style={
                  {
                    // fontFamily: FONTS.fontFamilyThinItalic,
                    // fontSize: hp(4),
                  }
                }>
                <View>
                  {checkingredients(meals).map(ite => {
                    return (
                      <View
                        key={ite}
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          justifyContent: 'start',
                        }}>
                        <View
                          style={{
                            height: 10,
                            width: 10,
                            borderRadius: 100,
                            marginTop: 4,
                            backgroundColor: COLORS.background,
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: hp(2),
                              fontFamily: FONTS.fontFamilyThin,
                            }}>
                            {meals['strIngredient' + ite]}
                          </Text>
                          <Text
                            style={{
                              fontSize: hp(2),
                              fontFamily: FONTS.fontFamilyThin,
                            }}>
                            {meals['strMeasure' + ite]}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(700)
                .springify()
                .damping(12)}
              style={{
                paddingHorizontal: 10,
                // backgroundColor: 'pink',
                marginTop: 10,
                borderRadius: 20,
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONTS.fontFamilyBold,
                  fontSize: hp(4),
                  paddingVertical: 10,
                }}>
                Instruction
              </Text>
              <View
                style={
                  {
                    // fontFamily: FONTS.fontFamilyThinItalic,
                    // fontSize: hp(4),
                  }
                }>
                <View>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      textAlign: 'justify',
                      fontSize: hp(2),
                      fontFamily: FONTS.fontFamilyThin,
                    }}>
                    {meals?.strInstructions}
                  </Text>
                </View>
                <View>
                  {meals.strYoutube && (
                    <View>
                      <Text
                        style={{
                          fontFamily: FONTS.fontFamilyBold,
                          fontSize: hp(4),
                          paddingVertical: 10,
                        }}>
                        Recipe Video
                      </Text>
                      <View>
                        <YoutubeIframe
                          videoId={getYoutubeVideoId(meals?.strYoutube)}
                          height={hp(30)}
                        />
                        {/* <YoutubePlayer
                          height={300}
                          play={playing}
                          videoId={'iee2TATGMyI'}
                          onChangeState={onStateChange}
                        />
                        <Button
                          title={playing ? 'pause' : 'play'}
                          onPress={togglePlaying}
                        /> */}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </Animated.View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({});
