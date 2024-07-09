import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/appScreens/Home/HomeScreen';
import JournalsScreen from '../screens/appScreens/Home/JournalsScreen';
import ProfileScreen from '../screens/appScreens/Home/ProfileScreen';
import CreateJournalScreen from '../screens/appScreens/Home/CreateJournalScreen';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/CustomColors';
import ModalPrac from '../screens/appScreens/Home/ModalPrac';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator 
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.warning,
        }}
    >
        <Tab.Screen name="Home" 
                    component={HomeScreen} 
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="home" size={size} color={color} />
                          )
                    }}
        />

        <Tab.Screen name="Create" 
                    component={CreateJournalScreen} 
                    options={{
                        title: 'Create',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="edit" size={size} color={color} />
                          )
                    }}
        />

        <Tab.Screen name="Journals" 
                    component={JournalsScreen} 
                    options={{
                        title: 'Journals',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="bookmark-box-multiple" size={size} color={color} />
                          )
                    }}
        />

        <Tab.Screen name="Profile" 
                    component={ProfileScreen} 
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="user" size={size} color={color} />
                          )
                    }}
        />
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})