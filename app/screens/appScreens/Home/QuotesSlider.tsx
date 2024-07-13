// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import axios from 'axios';

// const { width } = Dimensions.get('window');

// type Quote = {
//     quote: string;
//     author: string;
//   };
  
//   type NativeEvent = {
//     translationX: number;
//     state: number;
//   };
  

// const fetchQuotes = async (): Promise<Quote[]> => {
//     try {
//         const response = await axios.get('https://api.api-ninjas.com/v1/quotes?limit=50', {
//             headers: { 'X-Api-Key': '' },
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching quotes:', error);
//         return [];
//     }
// };

//   const QuotesSlider = () => {
//     const [quotes, setQuotes] = useState<Quote[]>([]);
//     const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
//     const [isPaused, setIsPaused] = useState(false);
//     const translateX = new Animated.Value(0);
  
//     useEffect(() => {
//       const loadQuotes = async () => {
//         const quotes = await fetchQuotes();
//         setQuotes(quotes);
//       };
  
//       loadQuotes();
  
//       const interval = setInterval(() => {
//         if (!isPaused) {
//           setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
//         }
//       }, 5000);
  
//       return () => clearInterval(interval);
//     }, [isPaused, quotes]);
  
//     const onGestureEvent = Animated.event([{ nativeEvent: { translationX: translateX } }], {
//       useNativeDriver: true,
//     });
  
//     const onHandlerStateChange = ({ nativeEvent }: { nativeEvent: NativeEvent }) => {
//       if (nativeEvent.state === State.END) {
//         if (nativeEvent.translationX > 50) {
//           setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
//         } else if (nativeEvent.translationX < -50) {
//           setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
//         }
  
//         Animated.timing(translateX, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: true,
//         }).start();
//       }
//     };
  
//     const currentQuote = quotes[currentQuoteIndex];
  
//     return (
//       <View style={styles.container}>
//         <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
//           <Animated.View style={[styles.quoteContainer, { transform: [{ translateX }] }]}>
//             {currentQuote && (
//               <>
//                 <Text style={styles.quoteText}>{currentQuote.quote}</Text>
//                 <Text style={styles.authorText}>- {currentQuote.author}</Text>
//               </>
//             )}
//           </Animated.View>
//         </PanGestureHandler>
//         <View style={styles.dotsContainer}>
//           {quotes.map((_, index) => (
//             <View key={index} style={[styles.dot, currentQuoteIndex === index && styles.activeDot]} />
//           ))}
//         </View>
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#fff',
//     },
//     quoteContainer: {
//       paddingHorizontal: 20,
//       paddingVertical: 40,
//       width: width - 40,
//       borderRadius: 10,
//       backgroundColor: '#f0f0f0',
//       alignItems: 'center',
//     },
//     quoteText: {
//       fontSize: 24,
//       fontStyle: 'italic',
//       textAlign: 'center',
//       marginBottom: 20,
//     },
//     authorText: {
//       fontSize: 18,
//       textAlign: 'center',
//       color: '#555',
//     },
//     dotsContainer: {
//       flexDirection: 'row',
//       marginTop: 20,
//     },
//     dot: {
//       width: 10,
//       height: 10,
//       borderRadius: 5,
//       backgroundColor: '#ccc',
//       marginHorizontal: 5,
//     },
//     activeDot: {
//       backgroundColor: '#000',
//     },
//   });
  
//   export default QuotesSlider;