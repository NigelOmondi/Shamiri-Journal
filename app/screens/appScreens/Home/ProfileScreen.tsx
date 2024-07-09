import { StyleSheet, Text, View, ToastAndroid, Button, TextInput, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { COLORS } from '@/constants/CustomColors'
import axios from 'axios'
import app from "@/firebaseConfig";
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

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
  const [isSaveEnabled, setIsSaveEnabled] = useState(false)
  const [loading, setIsLoading] = useState(true);

 


  useEffect(() => {
    setIsSaveEnabled(email !== '' && photo !== '');
  }, [email, photo]);

  const handleSave = async () => {
    const updatedDate = new Date().toISOString(); // Format date as needed
    try {
      await axios.post(`https://shaminstitute.onrender.com/`, {
        email,
        photo,
        date: updatedDate,
      });
      ToastAndroid.show("Your Profile was successfully Saved.", ToastAndroid.LONG);
      setIsSaveEnabled(false);
  
      console.log('Profile saved successfully');
    
    } catch (error) {
      console.error(error);
   
    }
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