import { StyleSheet, Text, View, Image, StatusBar, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import app from "@/firebaseConfig";
import { COLORS } from '@/constants/CustomColors';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Header = () => {

 const [user, setUser] = useState<User | null>(null);
 const [loading, setIsLoading] = useState(true);

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

  return (
    <View style={styles.container}>
        <View style={styles.profileMainContainer}>
         <StatusBar backgroundColor={COLORS.bgLineGradOne} barStyle="dark-content" />
        <View style={styles.profileContainer}>
            <Image 
                 source={user && user.photoURL ? { uri: user.photoURL } : require('../../../../assets/images/user.png')} 
                style={styles.userImage}
            />
            <View>
                <Text style={{color:COLORS.white, fontFamily: 'Lato-Bold'}}>Welcome</Text>
                <Text style={{color:COLORS.white, fontSize:13, fontFamily: 'Lato-Bold'}}>{ user?.email ? user.email : "Anonymous" }</Text>
            </View>
           
        </View>
            <MaterialCommunityIcons name="bookmark-box-multiple" size={30} color={COLORS.white} />
        </View>
        {/* search bar section */}
        <View style={styles.searchBarContainer}>
            <TextInput 
                placeholder='search ...'
                style={styles.textInput}
            />
            <AntDesign name="search1" size={26} color={COLORS.warning} style={styles.searchBtn}/>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: COLORS.warning,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    userImage: {
        width: 50,
        height: 50
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        width: '85%',
        fontSize: 16,
        fontFamily: 'Lato-LightItalic'
    },
    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 10
      
    },
    searchBtn: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    }
})