/* eslint-disable react-native/no-inline-styles */
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/solid';
import {COLORS, FONTS} from '../theme/theme';

const SearchBar = ({onSearch}) => {
  const [searchText, setSearchText] = useState('');
  const textInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleClearText = () => {
    setSearchText('');
    textInputRef.current.focus();
  };

  const handleSearchIconPress = () => {
    textInputRef.current.focus();
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 4,
        marginBottom: 10,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 100,
          padding: 5,
          justifyContent: 'center',
        }}
        onPress={handleSearch}>
        <MagnifyingGlassIcon size={hp(3)} strokeWidth={30} color={'grey'} />
      </TouchableOpacity>
      <TextInput
        ref={textInputRef}
        placeholder="Search any recipe"
        placeholderTextColor={COLORS.inActiveTab}
        style={[
          {
            flex: 1,
            fontSize: heightPercentageToDP(2.2),
            fontFamily: FONTS.fontFamilyRegular,
            textAlign: 'left',
            marginHorizontal: 4,
            borderRadius: 10,
            paddingHorizontal: 5,
            backgroundColor: 'transparent',
          },
        ]}
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSearch} // Handle search when Enter key is pressed
      />
      {searchText.length > 0 && (
        <TouchableOpacity
          onPress={handleClearText}
          style={{
            backgroundColor: COLORS.divider,
            borderRadius: 100,
            padding: 5,
            justifyContent: 'center',
          }}>
          <XMarkIcon size={hp(3)} strokeWidth={30} color={'grey'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
