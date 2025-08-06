// src/App.jsx
import { useState, useEffect } from 'react';
import { initializeIcons } from '@fluentui/react';
import { PrimaryButton, TextField, Stack } from '@fluentui/react';
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

initializeIcons();

function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = async () => {
    if (text.trim()) {
      await addDoc(collection(db, "items"), { text });
      setText('');
      fetchItems();
    }
  };

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const data = querySnapshot.docs.map(doc => doc.data().text);
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Stack tokens={{ childrenGap: 10 }} style={{ padding: 20 }}>
      <TextField
        label="Enter text"
        value={text}
        onChange={(e, newValue) => setText(newValue)}
      />
      <PrimaryButton text="Submit" onClick={handleSubmit} />
      
      <ul>
        {items.map((item, index) => (<li key={index}>{item}</li>))}
      </ul>
    </Stack>
  );
}

export default App;
