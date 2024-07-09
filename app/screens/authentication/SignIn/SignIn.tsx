import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '@/constants/CustomColors';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import app from "@/firebaseConfig";
import { getAuth, signInWithEmailAndPassword, User, onAuthStateChanged } from 'firebase/auth';



const SignIn = () => {

    const navigation: any = useNavigation();

    const auth = getAuth(app);


    const [email, setEmail] = useState("");
    const [password, setPassword] =  useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [hidePassword, setHidePassword] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [isSigningIn, setIsSigningIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
         
        });
    
        return () => {
          unsubscribe();
        };
      }, [auth]);

    const getErrors = (email: string, password: string) => {

        const errors: any = {}

        if (!email)
        {
            errors.email = "Please Enter Email"
        } else if ((!email.includes("@")) || (!email.includes(".com")))
        {
            errors.email = "Please enter a valid email"
        }

        if (!password) {
            errors.password = "Enter Password"
        } else if (password.length < 8) {
            errors.password = "Password too short (8 characters minimum)"
        }


        return errors;

    }

    const handleSignIn = () => {
       
        const errors = getErrors(email, password)

        if(Object.keys(errors).length > 0) {
            setShowErrors(true)
            setErrors(showErrors && errors)
            console.log(errors);
            
        } else {
            setErrors({});
            setShowErrors(false);
            handleLogin(email, password)
        }
    }

    const handleLogin = (email: string, password: string) => {
        setIsSigningIn(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Login Successfull");
                ToastAndroid.show("Login Successful!", ToastAndroid.LONG);
            })
            .catch(error => {
                console.log(error);
                if (error.code === 'auth/invalid-credential') {
                    ToastAndroid.show("Invalid Credentials.", ToastAndroid.LONG);
                 
                    setErrors({password: "Invalid Credentials"})
                } else if (error.code === 'auth/network-request-failed') {
                    ToastAndroid.show("Problem with your internet connection.", ToastAndroid.LONG);
                    setErrors({password: "Check your internet connection"})
                }
                setIsSigningIn(false);

            });
    };

    const LoginWithIcon = ({iconName, onPress, buttonTitle}: any) => {
        return (
            <TouchableOpacity 
                onPress={onPress}
                activeOpacity={0.8}
                style={{
        
                    width: '40%',
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    backgroundColor: COLORS.transparent,
                    borderWidth: 2,
                    borderColor: COLORS.white,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Fontisto name={iconName} style={{fontSize: 26, color: COLORS.black, marginBottom: 4}}  />
                <Text style={{
                    fontSize: 14,
                    color: COLORS.black,
                    opacity: 0.4
                }}>{buttonTitle}</Text>
            </TouchableOpacity>
        )
    }

  return (

    <View>
      <LinearGradient 
            colors={[COLORS.bgLineGradOne, 
                    COLORS.bgLineGradTwo,
                    COLORS.bgLineGradThree,
                    COLORS.bgLineGradFour,
                    COLORS.bgLineGradFive,
                    COLORS.bgLineGradSix]} 
            style={{width: '100%', height: '100%', paddingVertical: 10, paddingHorizontal: 10}}>

                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                    style={{
                        backgroundColor: COLORS.white,
                        width: 40,
                        aspectRatio: 1 / 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100,
                        elevation: 4,
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        zIndex: 100 }}>
                   <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>

                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={{
                       paddingTop: 60
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        marginTop: 20,
                        fontSize: 30,
                        marginBottom: 10,
                        color: COLORS.black,
                        letterSpacing: 2,
                        fontWeight: '500'
                    }}>Welcome Back :)
                    </Text>

                    <Text style={{
                        textAlign: 'center',
                        marginVertical: 20,
                        fontSize: 18,
                        marginBottom: 80,
                        color: COLORS.black,
                        letterSpacing: 2,
                        fontWeight: '400',
                        opacity: 0.4
                    }}>We missed you here.
                    </Text>

                    <View style={{
                        width: '100%',

                    }}>
                        <View style={{
                            width: '100%',
                            marginBottom: 20
                        }}>
                            <TextInput 
                                value={email}
                                onChangeText={text => setEmail(text)}
                                placeholder='Enter Email'
                                placeholderTextColor={COLORS.lightText}
                                keyboardType='email-address'
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    fontSize: 14,
                                    color: COLORS.black,
                                    borderRadius: 10,
                                    backgroundColor: COLORS.white }}
                            />
                            {errors.email && <Text style={{
                                fontSize: 14,
                                color: COLORS.warning,
                                marginTop: 4,
                                marginStart: 4
                            }}>{errors.email}</Text>}
                         
                        </View>

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
                                    fontSize: 14,
                                    color: COLORS.black,
                                    flex: 1,
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
                            
                             {errors.password && <Text style={{
                                fontSize: 14,
                                color: COLORS.warning,
                                marginTop: 4,
                                marginStart: 4
                            }}>{errors.password}</Text>}
                        </View>

                        <TouchableOpacity 
                            onPress={() => handleSignIn()}
                            activeOpacity={0.8}
                            style={{
                                width: '100%',
                                paddingVertical: 14,
                                paddingHorizontal: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: COLORS.accent,
                                borderRadius: 10,
                                elevation: 8,
                                shadowColor: COLORS.accent
                            }}
                            disabled={isSigningIn}>
                            <Text style={{color: COLORS.white, fontSize: 16}}>
                                {isSigningIn ? "Signing you in..." : "Sign In"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 30
                    }}>
                        <LinearGradient 
                            start={{x:1, y: 0}}
                            end={{x:0.5, y: 1}}
                            colors={['#00000090','#00000090', '#ffffff00']} 
                            style={{
                                flex: 1,
                                paddingVertical: 1.4,
                                borderRadius: 100,

                            }}
                        >

                        </LinearGradient>

                        <Text style={{
                            fontSize: 14,
                            color: COLORS.black,
                            opacity: 0.4,
                            marginHorizontal: 18
                            }}>Or continue with</Text>

                        <LinearGradient 
                            start={{x: 0, y: 0}}
                            // end={{x:1, y: 0}}
                            colors={['#00000090','#00000090', '#ffffff00']} 
                            style={{
                                flex: 1,
                                paddingVertical: 1.4,
                                borderRadius: 100,

                            }}
                        >
                        </LinearGradient>

                    </View>

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginTop: 10,
                            marginBottom: 40
                        }}>
                            <LoginWithIcon iconName="google" 
                                            onPress={ () => {Alert.alert("TODO:// Sign In With Google");} } 
                                           buttonTitle="Google"/>

                            <LoginWithIcon iconName="person" 
                                           onPress={ () => {Alert.alert("TODO:// Sign In Anonymously");} } 
                                           buttonTitle="Anonymous"/>
                        </View>
                    </View>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate("SignUp")}
                        activeOpacity={0.8}
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            paddingVertical: 2
                        }}
                       >
                            <Text style={{
                                fontSize:14,
                                fontWeight: '400',
                                color: COLORS.black
                            }}>Don't have an account? 
                            <Text style={{color: COLORS.accent}}>  Sign Me Up</Text>
                            </Text>
                    </TouchableOpacity>

                    {/* Helps us see the conponents at the bottom */}
                    <View style={{
                        height: 60,
                        width: '100%',
                        backgroundColor: COLORS.transparent
                    }}>

                    </View>
                </ScrollView>

        </LinearGradient>
    </View>

  )
}

export default SignIn

const styles = StyleSheet.create({})