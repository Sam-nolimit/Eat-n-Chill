/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  // TouchableOpacity,
  StatusBar,
  ScrollView,
  // Image,
} from 'react-native';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS} from '../theme/theme';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipe from '../components/Recipe';

export default function HomeScreen({navigation}) {
  const [activeCategory, setActiveCategory] = useState('Beef');

  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Define the API endpoint
    // Call the async fetchData function
    fetchData();
    getRecipes();
  }, []);
  const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  // Create an async function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      // console.log('?????????????????', response.data);
      // Extract the data from the response
      const {categories} = response.data;
      // console.log(categories, '//////////////////////////');

      // Set the fetched data to the state
      setCategories(categories);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // setLoading(false);
    }
  };

  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );

      if (response.data.meals) {
        const mealsData = response.data.meals;
        console.log('Fetched meals:', mealsData);
        setMeals(mealsData);
      } else {
        // Handle the case where there are no meals for the given category
        setMeals([]); // Set meals to an empty array or handle it as needed
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangeCategories = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        style={{
          paddingTop: 20,
          paddingHorizontal: 5,
          borderRadius: 20,
          // backgroundColor: 'pink',
        }}>
        <View
          style={{
            marginBottom: 10,
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              fontSize: hp(2),
              fontFamily: FONTS.fontFamilyRegular,
              marginBottom: 4,
            }}>
            {' '}
            Hello, Bolu!
          </Text>
          <View>
            <Text
              style={{fontSize: hp(3.8), fontFamily: FONTS.fontFamilyMedium}}>
              Make your own food,
            </Text>
            <Text
              style={{fontSize: hp(3.8), fontFamily: FONTS.fontFamilyMedium}}>
              Stay at <Text style={{color: COLORS.background}}>home</Text>
            </Text>
          </View>
        </View>
        <SearchBar />
        {/* categories */}
        {categories.length > 0 && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategories={handleChangeCategories}
          />
        )}
        {/* recipr */}
        {/* {recipes.length > 0 && ( */}
        <Recipe
          meals={meals}
          categories={categories}
          // recipes={recipes}
        />
        {/* )} */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  header: {
    marginBottom: 20,
  },
  image: {
    width: 123,
    height: 38,
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
