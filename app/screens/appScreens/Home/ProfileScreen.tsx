import { StyleSheet, Text, View, ToastAndroid, Button, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { COLORS } from '@/constants/CustomColors'
import app from "@/firebaseConfig";
import { getAuth, User, onAuthStateChanged, updateEmail, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const ProfileScreen = () => {

  const navigation: any = useNavigation(); 

  const [currentUser, setCurrentUser] = useState<User | null>();
  const [email, setEmail] = useState<string>("");
  const [photo, setPhoto] = useState();
  const [password, setPassword] = useState<string>('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false)
  const [loading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [emailFieldEnabled, setIsEmailFieldEnabled] = useState(false);
  const [passwordFieldEnabled, setIsPasswordFieldEnabled] = useState(false)

  const [hidePassword, setHidePassword] = useState(false);


  const auth = getAuth(app);

  const user = auth.currentUser;
  //console.log("user on profile screen is",user);
  

  const resetEmail = () => {
    if (user) {
      updateEmail(user, email).then(() => {
        Alert.alert('Email updated successfully');
        setIsEmailFieldEnabled(false);
        
      }).catch((error) => {
        console.log(error.message);
        
      });
  
    }
  }

  useEffect(() => {
    setEmail(user?.email ? user.email : '');
    //console.log("email is", email);
    
  }, [,email]);

  const resetPassword = () => {
    if (user) {
      sendPasswordResetEmail(auth, email).then(() => {
        Alert.alert('Password reset sent successfully to your email.');
        setIsPasswordFieldEnabled(false)
        
      }).catch((error) => {
        console.log(error.message);

        
      });
  
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  
    return () => {
      unsubscribe();
    };
  }, [auth, navigation]);

  

 

  useEffect(() => {
    setIsSaveEnabled(email !== '' && photo !== '' && password !== '');
  }, [email, photo, password]);

  const handleSave = () => {
    
      ToastAndroid.show("Your Profile was successfully Saved.", ToastAndroid.LONG);
      setIsSaveEnabled(false);
  
      console.log('Profile saved successfully');
    

  };

  const TogglePasswordEdit = () => {

    setIsPasswordFieldEnabled(!passwordFieldEnabled);
  }

  const ToggleEmailEdit = () => {

    setIsEmailFieldEnabled(!emailFieldEnabled);
  }



  return (
    <View style={{marginTop: 30}}>
      <Text style={styles.profileHeaderText}>My Profile</Text>
      <View>
      <View style={styles.container}>

      <Image 
                 source={user && user.photoURL ? { uri: user.photoURL } : require('../../../../assets/images/user.png')} 
                style={[styles.userImage, {marginLeft: 10}]}
            />
   
        <View style={styles.resetsContainer}>
            <TextInput 
                placeholder='email ...'
                style={styles.textInput}
                value={user?.email ? user.email : "Anonymous"}
                onChangeText={text => setEmail(text)}
                editable={emailFieldEnabled}
            />
            <TouchableOpacity onPress={ToggleEmailEdit}>
               <MaterialCommunityIcons name="email-edit-outline" size={24} color={COLORS.white} style={styles.editBtn}/>
            </TouchableOpacity>
        </View>

        <View style={{width: '50%', marginBottom: 20, marginHorizontal: 10}}>
      <Button 
          title="Change Email"
          onPress={resetEmail} 
          disabled={!emailFieldEnabled}
          >
      
      </Button>
    </View>

        <View style={styles.passwordResetContainer}>
          <View style={{width: '53%'}}>
              <Button 
                title="Reset Password"
                onPress={resetPassword} 
                disabled={!passwordFieldEnabled}
                >         
            </Button>
            </View>

            <TouchableOpacity onPress={TogglePasswordEdit}>
               <MaterialCommunityIcons name="shield-edit-outline" size={24} color={COLORS.white} style={styles.editBtn}/>
            </TouchableOpacity>
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
resetsContainer: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  marginBottom: 10

},
passwordResetContainer: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  marginBottom: 10,
  marginLeft: 10,
  marginRight: 6

},
editBtn: {
  backgroundColor: '#008000',
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 10,

}
})