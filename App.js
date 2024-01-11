import React ,  { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import Routes from './src/routes'
import {StatusBar} from 'react-native';
import * as Font from 'expo-font';


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await  Font.loadAsync({
        'Varela-Round': require('./src/fonts/VarelaRound-Regular.ttf'),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#3B267B' barStyle={'light-content'}/>
      <Routes/>
    </NavigationContainer>
  );
}
