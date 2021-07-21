import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, Animated} from 'react-native';
import {Button} from 'react-native-paper';

function Onboarding({navigation}) {
  const [LogoAnime, setLogoAnime] = useState(new Animated.Value(0));
  const [LogoText, setLogoText] = useState(new Animated.Value(0));
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const handleLogin = () => {
    navigation.replace('Login');
  };
  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  function RunME() {
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
        useNativeDriver: false,
      }).start(),

      Animated.timing(LogoText, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setLoadingSpinner(true);
    });
  }

  useEffect(() => {
    RunME();
  }, []);

  return (
    <ImageBackground
      style={{
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
      imageStyle={{opacity: 0.4}}
      resizeMode="cover"
      source={{
        uri: 'https://images.unsplash.com/photo-1571388878919-2d2214775af4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      }}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View
          style={{
            opacity: LogoAnime,
            top: LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 50, color: 'white'}}>
            Webstar
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: LogoText,
          }}>
          <Text
            style={{
              color: 'white',
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Mohali Punjab
          </Text>
        </Animated.View>
      </View>
      <View
        style={{
          flex: 0.1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}>
        <Button
          contentStyle={{padding: 5, backgroundColor: '#9CC3D5FF'}}
          style={{width: '40%'}}
          mode="contained"
          onPress={handleLogin}>
          Login
        </Button>
        <Button
          contentStyle={{padding: 5, backgroundColor: '#0063B2FF'}}
          style={{width: '40%'}}
          mode="contained"
          onPress={handleSignUp}>
          Sign Up
        </Button>
      </View>
    </ImageBackground>
  );
}

export default Onboarding;
