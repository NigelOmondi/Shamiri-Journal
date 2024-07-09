import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';
import { COLORS } from '@/constants/CustomColors'

const ModalPrac = (item: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [content, setContent] = useState(item.content);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput 
                placeholder='Enter A Title ...'
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.textInput}
            />
           
            <TextInput 
                placeholder='Choose A Category ...'
                value={category}
                onChangeText={text => setCategory(text)}
                style={styles.textInput}
            />

           <TextInput 
                multiline
                numberOfLines={5}
                maxLength={300}
                placeholder='Enter Your Description ...'
                value={content}
                onChangeText={text => setContent(text)}
                style={styles.textInput}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Save Edit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Edit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalView: {
    // margin: 20,
    // backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
   
    shadowColor: '#000',
   
    shadowOpacity: 0.25,
   
    elevation: 2,
    width: '90%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Lato-LightItalic',
    marginVertical: 10,
    elevation: 4
  }, 
});

export default ModalPrac;