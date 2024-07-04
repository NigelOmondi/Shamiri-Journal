import { Text, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./home";
import DetailsScreen from "./details";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    
     <Stack.Navigator>
       
       <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
       <Stack.Screen name="Details" component={DetailsScreen} />
       
    </Stack.Navigator>
   
  );
}
