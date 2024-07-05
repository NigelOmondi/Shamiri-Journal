import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/appScreens/Home/Home";
import OnBoarding from "./screens/authentication/OnBoarding/OnBoarding";
import SignIn from "./screens/authentication/SignIn/SignIn";
import SignUp from "./screens/authentication/SignUp/SignUp";
import app from "@/firebaseConfig";
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();

export default function Index() {

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
         <Stack.Screen name="Home">
         {props => <Home {...props} user={user} />}
       </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}
