import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, SectionList, Modal, Alert, Pressable, TextInput, ToastAndroid, Button} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { COLORS } from '@/constants/CustomColors'
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const api = axios.create({
  baseURL: 'https://shaminstitute.onrender.com'
});



const JournalsScreen = () => {
  const navigation: any = useNavigation();
 

  const [sections, setSections] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<object | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [idToUpdate, setIdToUpdate] = useState()
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
 

  // useEffect(() => {
  //   const fetchAllJournals = async () => {
  //     try {
  //       const res = await api.get("/journals");
  //       const groupedByDate = res.data.reduce((acc: any, journal: any) => {
  //         const date = journal.date.split('T')[0]; // Extract date part only
  //         if (!acc[date]) {
  //           acc[date] = [];
  //         }
  //         acc[date].push(journal);
  //         return acc;
  //       }, {});

  //       const sections = Object.keys(groupedByDate).map(date => ({
  //         title: date,
  //         data: groupedByDate[date],
  //       }));

  //       setSections(sections);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchAllJournals();
  // }, [,sections]);

  useEffect(() => {
    const fetchAllJournals = async () => {
      try {
        const res = await api.get("/journals");
        const groupedByDate = res.data.reduce((acc: { [key: string]: any[] }, journal: any) => {
          const date = journal.date.split('T')[0]; // Extract date part only
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(journal);
          return acc;
        }, {});
  
        // Sort the dates in descending order
        const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b as string).getTime() - new Date(a as string).getTime());
  
        // Map sorted dates to create sections
        const sections = sortedDates.map(date => ({
          title: date,
          data: groupedByDate[date],
        }));
  
        setSections(sections);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllJournals();
  }, [,sections, title, category, content]);
  

  const handleEdit = async (item: any) => {

    setSelectedItem(item);
    console.log("Selected Journal  to edit", item);
    setModalVisible(true);
    setTitle(item.title);
    setCategory(item.category);
    setContent(item.content);
    setIdToUpdate(item.id)

    console.log("ID of journal to edit", item.id);
    console.log("Title to edit", item.title);
    console.log("Category to edit", item.category);
    console.log("Content to edit", item.content);
    console.log("Date submitted to edit", item.date);

    //handleSaveEdit(item);
    
  };


  const handleSaveEdit = async (item: any) => {

    const updatedDate = new Date().toISOString();

    if (item.title !== '' && item.category !== '' && item.content !== '' && item.id !== '') {
      setTitle(item.title);
      setCategory(item.category);
      setContent(item.content);
      setIdToUpdate(idToUpdate);
      console.log("ID passed into the url", idToUpdate);
      
    }
    setIsSaving(true);
    try {
      let result = await axios.put(`https://shaminstitute.onrender.com/journals/${idToUpdate}`, {
        title,
        category,
        content,
        date: updatedDate,
      });
      setIsSaving(false);
      console.log("Response from UPDATE HTTPS Request: ", result.data)
      setModalVisible(false);
      ToastAndroid.show("Journal Successfully Updated.", ToastAndroid.LONG)
      console.log("Title submitted for edit", title);
      console.log("Category submitted for edit", category);
      console.log("Content submitted for edit", content);

    } catch (error) {

      setIsSaving(false);
      console.error(error);
    }

  }

  const handleDelete = async (item: any) => {
    setSelectedItem(item);
    console.log("Selected Journal to DELETE", item.title);
    console.log("ID of journal to DELETE", item.id);

    try {
      let result = await axios.delete(`https://shaminstitute.onrender.com/journals/${item.id}`);
      console.log("Response from UPDATE HTTPS Request: ", result.data)
    
      ToastAndroid.show("Journal Successfully DELETED.", ToastAndroid.LONG)
     
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    setIsSaveEnabled(title !== '' && category !== '' && content !== '');
  }, [title, category, content]);


  return (
    <View>
      <View>

      

        <View>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
                <Text style={styles.journalTitle}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>

                <Text style={{paddingTop: 10,paddingBottom: 30, fontFamily: 'Lato-Regular'}}>{item.content}</Text>
                <View style={{display: 'flex', flexDirection: 'row', gap: 20, justifyContent: 'flex-end'}}>
                
                {modalVisible && 
                  <View>
                    
                  <Modal
                      animationType="slide"
                      transparent={false}
                      visible={modalVisible}
                      onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                      <Text style={{textAlign: 'center', marginTop: 40, fontFamily: 'Lato-Bold', fontSize: 30}}>Edit Entry</Text>

                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <TextInput 
                          placeholder='Enter A Title ...'
                          value={title}
                          onChangeText={text => setTitle(text)}
                          style={styles.textInput}
                      />
                    
                  <Picker
                      selectedValue={category}
                      onValueChange={(itemValue) => setCategory(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Choose A Category ..." value="" />
                      <Picker.Item label="Personal Category" value="Personal Category" />
                      <Picker.Item label="Work Category" value="Work Category" />
                      <Picker.Item label="Travel Category" value="Travel Category" />
                 </Picker>

                    <TextInput 
                          multiline
                          numberOfLines={5}
                          maxLength={300}
                          placeholder='Enter Your Description ...'
                          value={content}
                          onChangeText={text => setContent(text)}
                          style={styles.textInput}
                      />
                      <Button 
                 title={isSaving ? "Saving Changes..." : "Save Edit"}
                  onPress={() => handleSaveEdit(item)} 
                   disabled={!isSaveEnabled || isSaving}
                  >
              
              </Button>
                    </View>
                  </View>
                  </Modal>

                  </View>

                  }

                  <TouchableOpacity  onPress={() => handleEdit(item)} style={styles.editBtn}>
                    <Text style={{color: COLORS.white, textAlign: 'center'}}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.deleteBtn}  onPress={() => handleDelete(item)} >
                    <Text style={{color: COLORS.white, textAlign: 'center'}}>Delete</Text>
                  </TouchableOpacity>
                </View>
                
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        </View>
      </View>

    </View>

    

    
  )
}

export default JournalsScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 15,
    margin: 15,
    elevation: 4
  },
  journalTitle: {
    fontSize:20, 
    fontFamily: 'Lato-Bold',
    paddingBottom: 15
  },
  cardContent: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  category: {
    paddingVertical: 10, 
    color:COLORS.accent, 
    fontFamily: 'Lato-Bold'
  },
  editBtn: {
    marginBottom: 15,
    backgroundColor: '#008000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  
  },
  deleteBtn: {
    marginBottom: 15,
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Elevation for Android
    elevation: 4,
  },
  title: {
    fontSize: 24,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#eee",
    padding: 10,
    marginHorizontal: 16,
    marginTop: 16,
  },
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
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    marginVertical: 10,
    elevation: 4
  }, 
  picker: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    marginVertical: 10,
  },
 
})