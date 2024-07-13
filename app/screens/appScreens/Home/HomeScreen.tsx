import { Dimensions, StyleSheet, Text, View, Animated, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Slider from './Slider'


const HomeScreen = () => {
  
 

  return (
    <View>
      <Header />
      <View style={{padding: 20}}>
         <Slider />
         {/* <Categories /> */}
    
         <View>
          <Image source={require('../../../../assets/images/istockphoto.jpg')} style={styles.image}/>
         </View>
      </View>
     
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 20,
  }
})