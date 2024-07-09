import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/appScreens/Home/Home";
import OnBoarding from "./screens/authentication/OnBoarding/OnBoarding";
import SignIn from "./screens/authentication/SignIn/SignIn";
import SignUp from "./screens/authentication/SignUp/SignUp";
import app from "@/firebaseConfig";
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNavigation from "./navigations/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

// SplashScreen.preventAutoHideAsync();

export default function Index() {

  const [loaded, error] = useFonts({
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-LightItalic': require('../assets/fonts/Lato-LightItalic.ttf'),
  });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, []);


  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth(app);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
    
      {user ? (
        <TabNavigation />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
   
    </>
  );
}
