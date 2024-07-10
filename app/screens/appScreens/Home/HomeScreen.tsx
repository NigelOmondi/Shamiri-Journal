import { Dimensions, StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Slider from './Slider'
import QuotesSlider from './QuotesSlider'

const HomeScreen = () => {
  
 

  return (
    <View>
      <Header />
      <View style={{padding: 20}}>
         <Slider />
         {/* <Categories /> */}
         <QuotesSlider />
      </View>
     
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})