import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { COLORS } from '@/constants/CustomColors';
import { LinearGradient } from 'expo-linear-gradient';



const OnBoarding = ( navigation: any) => {
  return (
    <View>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgLineGradOne}/>

        <LinearGradient 
            colors={[COLORS.bgLineGradOne, 
                    COLORS.bgLineGradTwo,
                    COLORS.bgLineGradThree,
                    COLORS.bgLineGradFour,
                    COLORS.bgLineGradFive,
                    COLORS.bgLineGradSix]} 
            style={{width: '100%', height: '100%'}}>

            <View style={{
                width: '100%',
                height: '50%',
                padding: 16
            }}>
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: COLORS.onBoardCardBG,
                    borderRadius: 20
                }}>
                    <Image source={require("../../../../assets/images/clipboard-checkmarks.png")}
                        style={{ height: '100%', aspectRatio: 1 / 1 }} 
                    />
                </View>
            </View>

            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
                marginBottom: 20
            }}>
                <Text style={{
                    fontSize: 24,
                    color: COLORS.black,
                    fontWeight: '800',
                    letterSpacing: 1
                }}>
                    Document Your Journey</Text>

            <Text style={{
                    fontSize: 24,
                    color: COLORS.black,
                    fontWeight: '800',
                    letterSpacing: 1
                }}>
                    Boost Your Productivity</Text>
            </View>

            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 40
            }}>
                <Text style={{
                    color: COLORS.black
                }}>
                    Effortless Journaling and Seamless
                </Text>
                <Text style={{
                    color: COLORS.black
                }}>Organization for Productivity Enthusiasts</Text>
            </View>

            <View style={{
                paddingHorizontal: 40,
                marginTop: 60
            }}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("SignUp")}
                        activeOpacity={0.8}
                        style={{
                            width: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 16,
                            backgroundColor: COLORS.white,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: COLORS.black,
                                fontWeight: '600'
                            }}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate("SignIn")}
                        activeOpacity={0.8}
                        style={{
                            width: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 16,
                            backgroundColor: COLORS.transparent,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            borderWidth: 2,
                            borderColor: COLORS.white
                            
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: COLORS.black,
                                fontWeight: '600'
                            }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </LinearGradient>
     
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({})