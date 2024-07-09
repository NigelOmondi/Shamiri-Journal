import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button } from 'react-native'; // Assuming React Native for UI components
import axios from 'axios';

const EditJournalModal = ({ isVisible, item, onClose }: any) => {
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [content, setContent] = useState(item.content);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const handleSave = async () => {
    const updatedDate = new Date().toISOString(); // Format date as needed
    try {
      await axios.put(`https://shaminstitute.onrender.com/journals/${item.id}`, {
        title,
        category,
        content,
        date: updatedDate,
      });
      onClose(true); // Close modal and indicate success to refresh list or take other actions
    } catch (error) {
      console.error(error);
      onClose(false); // Close modal and indicate failure
    }
  };

  // Enable save button only if all fields are filled
  useEffect(() => {
    setIsSaveEnabled(title !== '' && category !== '' && content !== '');
  }, [title, category, content]);

  return (
    <Modal visible={isVisible} onRequestClose={() => onClose(false)}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} />
      <TextInput placeholder="Content" value={content} onChangeText={setContent} multiline />
      <Button title="Save" onPress={handleSave} disabled={!isSaveEnabled} />
    </Modal>
  );
};

export default EditJournalModal;