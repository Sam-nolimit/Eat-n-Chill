import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CachedImage = props => {
  const {uri} = props;
  const [cacheSource, setCacheSource] = useState(null);

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCacheSource({uri: cachedImageData});
        } else {
          const response = await fetch(uri);
          if (!response.ok) {
            throw new Error('Failed to fetch image');
          }

          const imageBlob = await response.blob();
          const base64Data = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });

          await AsyncStorage.setItem(uri, base64Data); // Fixed AsyncStorage.setItem call
          setCacheSource({uri: base64Data});
        }
      } catch (error) {
        console.error(error);
        setCacheSource({uri});
      }
    };

    getCachedImage(); // Use a consistent function name

    // Add 'uri' to the dependency array
  }, [uri]);

  return <Animated.Image source={cacheSource} {...props} />;
};
