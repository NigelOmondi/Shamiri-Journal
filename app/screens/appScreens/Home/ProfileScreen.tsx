import { StyleSheet, Text, View, ToastAndroid, Button, TextInput, Image, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { COLORS } from '@/constants/CustomColors'
import axios from 'axios'
import app from "@/firebaseConfig";
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const ProfileScreen = () => {

  const navigation: any = useNavigation(); 

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  
    return () => {
      unsubscribe();
    };
  }, [auth, navigation]);

  const [user, setUser] = useState<User | null>();
  const [email, setEmail] = useState<string>();
  const [photo, setPhoto] = useState();
  const [password, setPassword] = useState<string>('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false)
  const [loading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [hidePassword, setHidePassword] = useState(false);


 

  useEffect(() => {
    setIsSaveEnabled(email !== '' && photo !== '' && password !== '');
  }, [email, photo, password]);

  const handleSave = () => {
    
      ToastAndroid.show("Your Profile was successfully Saved.", ToastAndroid.LONG);
      setIsSaveEnabled(false);
  
      console.log('Profile saved successfully');
    

  };


  return (
    <View style={{marginTop: 30}}>
      <Text style={styles.profileHeaderText}>My Profile</Text>
      <View>
      <View style={styles.container}>

      <Image 
                 source={user && user.photoURL ? { uri: user.photoURL } : require('../../../../assets/images/user.png')} 
                style={styles.userImage}
            />
   
   
    <TextInput
        value={user?.email ? user.email : "Anonymous"}
        onChangeText={text => setEmail(text)}
        style={styles.textInput}
        
    />
                        <View style={{
                            width: '100%',
                            marginBottom: 20
                        }}>
                            <View style={{
                            width: '100%',
                            borderRadius: 10,
                            backgroundColor: COLORS.white,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}>

                        <TextInput 
                                value={password}
                                onChangeText={text => setPassword(text)}
                                placeholder='Password'
                                placeholderTextColor={COLORS.lightText}
                                secureTextEntry={hidePassword ? true : false}
                                maxLength={40}
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    fontSize: 17,
                                    fontFamily: 'Lato-LightItalic',
                                    // color: COLORS.black,
                                    borderRadius: 10,
                                    backgroundColor: COLORS.white }}
                            />
                            {password.length > 0 && 
                              <TouchableOpacity 
                                onPress={() => setHidePassword(!hidePassword)}
                                activeOpacity={0.9}
                                style={{
                                paddingRight: 20
                              }}>
                                <Entypo name={hidePassword ? "eye" : "eye-with-line"} style={{fontSize: 24, color: COLORS.black}} />
                              </TouchableOpacity>
                            }
                          </View>
                           
                        </View>

    <View>
      <Button 
          title="Save"
          onPress={handleSave} 
          disabled={!isSaveEnabled}
          >
      
      </Button>
    </View>

  
</View>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profileHeaderText: {
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    fontSize: 30
  },
  container: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    margin: 15,
   
  },
  textInput: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Lato-LightItalic',
    marginVertical: 10,
  }, 
  saveBtn: {
    marginBottom: 15,
    backgroundColor: '#008000',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  userImage: {
    width: 50,
    height: 50
},
})