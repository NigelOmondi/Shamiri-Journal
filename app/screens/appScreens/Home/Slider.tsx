import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'
import { ImageSourcePropType } from 'react-native';


const DATA = [
    {
      id: 1,
      title: 'First Item',
      image: require('../../../../assets/images/Clipboard.jpg')
    },
    {
      id: 2,
      title: 'Second Item',
      image: require('../../../../assets/images/clipboard-check-marks.jpg')
    },
    {
        id: 3,
        title: 'Third Item',
        image: require('../../../../assets/images/3d-white-clipboard.jpg')
      },
  ];

  type ItemProps = {
    title: string;
    image: ImageSourcePropType;
  };

  const Item = ({title, image}: ItemProps) => (
    <View>
        <Text>{title}</Text>
        <Image source={image} />
        
    </View>
  );

const Slider = () => {
  return (
    <View>
      <Text style={styles.heading}>Journal it Down</Text>
      <FlatList data={DATA}
                 horizontal={true}
                 showsHorizontalScrollIndicator={false}
                 renderItem={({item}) => (
                   <View style={{marginLeft:-60}}>
                       <Image source={item.image} style={styles.sliderImage}/>
                   </View>  
                )}
       />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontFamily: 'Lato-Bold',
        marginBottom: 10
    },
    sliderImage :{
        width: 270,
        height: 150,
        borderRadius: 20,
        objectFit: 'contain'
    }
})