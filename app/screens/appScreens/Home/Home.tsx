import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image } from "react-native";
import { COLORS } from '@/constants/CustomColors';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, User, signOut } from 'firebase/auth';
import app from "@/firebaseConfig";
import axios from "axios";

type HomeProps = {
  user: User;
};

const api = axios.create({
  baseURL: 'https://shaminstitute.onrender.com'
});


const auth = getAuth(app);

export default function Home({ user }: HomeProps) {

  const [journals, setJournals] = useState({});

  useEffect(() => {
    const fetchAllJournals = async () => {
      try {
        const res = await api.get("/journals");
        console.log("Response",res.data);
        setJournals(res.data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchAllJournals()
  }, []);

  const handleSignOut = () => {
    try {
      auth.signOut();
      console.log("User Signed Out");
      
    } catch (error) {
      console.log(error);
      
      
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar backgroundColor={COLORS.bgLineGradOne} barStyle="dark-content" />
      <LinearGradient 
            colors={[COLORS.bgLineGradOne, 
                    COLORS.bgLineGradTwo,
                    COLORS.bgLineGradThree,
                    COLORS.bgLineGradFour,
                    COLORS.bgLineGradFive,
                    COLORS.bgLineGradSix]} 

            style={{width: '100%', 
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
            }}>
               <Text style={{
                color: COLORS.black,
                fontSize: 20,
               }}>Welcome</Text>
               <Text style={{
                color: COLORS.black,
                fontSize: 30,
                fontWeight: '700',
                letterSpacing: 2,
                marginTop: 10,
                marginBottom: 40
               }}>{ user.email ? user.email : "Anonymous" }
            </Text>

            {/* <View>
              <Text>All Books</Text>
              <View>
                {books.map(book => (
                  <View>
                    {book.cover && <Image source={book.cover} />}
                  </View>
                ))}
              </View>
            </View> */}

               <TouchableOpacity 
                  onPress={() => handleSignOut()}
                  activeOpacity={0.8}
                  style={{
                  marginTop: 20,
                  backgroundColor: COLORS.warning,
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 8
               }}>
                  <Text style={{color: COLORS.white}}>Sign Out</Text>
               </TouchableOpacity>
            </LinearGradient>

     
    </View>
  );
}
