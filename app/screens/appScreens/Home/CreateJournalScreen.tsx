import { StyleSheet, Text, View, TextInput, ToastAndroid, Button, ScrollView, RefreshControl } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { COLORS } from '@/constants/CustomColors'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';



const CreateJournal = () => {

  const navigation: any = useNavigation(); 

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
 

  // Enable save button only if all fields are filled
  useEffect(() => {
    setIsSaveEnabled(title !== '' && category !== '' && content !== '');
  }, [title, category, content]);

  const goToJournals = () => {() => navigation.navigate("Journals")}

  const handleSave = async () => {
    const updatedDate = new Date().toISOString();
    setIsSaving(true);
    try {
      await axios.post(`https://shaminstitute.onrender.com/journals`, {
        title,
        category,
        content,
        date: updatedDate,
      });
      setIsSaving(false);
      ToastAndroid.show("Journal Successfully Saved.", ToastAndroid.LONG);
      setIsSaveEnabled(false);
      setTitle("");
      setCategory("");
      setContent("");
      goToJournals();
      console.log('Journal saved successfully');
    
    } catch (error) {
      setIsSaving(false);
      console.error(error);
   
    }
  };

  return (
    
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{textAlign: 'center', marginTop: 40, fontFamily: 'Lato-Bold', fontSize: 30}}>Log a Journal</Text>
      <View style={styles.container}>

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

            <View style={{marginTop: 10}}>
              <Button 
                  title={isSaving ? "Saving..." : "Save"}
                  onPress={handleSave} 
                  disabled={!isSaveEnabled || isSaving}
                  >
              
              </Button>
            </View>

          
      </View>
      </ScrollView>
    </View>
    
  )
}

export default CreateJournal

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    margin: 15,
   
  },
  textInput: {
    backgroundColor: COLORS.white,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
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
  picker: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    marginVertical: 10,
  },
})