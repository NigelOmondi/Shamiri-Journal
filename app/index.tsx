import { Text, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/appScreens/Home/Home";
import OnBoarding from "./screens/authentication/OnBoarding/OnBoarding";
import Details from "./screens/details";
import SignIn from "./screens/authentication/SignIn/SignIn";
import SignUp from "./screens/authentication/SignUp/SignUp";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    
     <Stack.Navigator 
        screenOptions={{headerShown: false}}>

       <Stack.Screen name="OnBoarding" component={OnBoarding}  />
       <Stack.Screen name="SignIn" component={SignIn}  />
       <Stack.Screen name="SignUp" component={SignUp}  />
       <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="Details" component={Details} />
       
    </Stack.Navigator>
   
  );
}
