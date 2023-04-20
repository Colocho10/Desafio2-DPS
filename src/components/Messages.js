import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Message from './Message';

export default function Messages() {
    
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const fetchMessages = () => {
    //Metodo GET
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then(data => setMessages(data))
  }
  const addMessage = () => {
    //Metodo POST
    const requestBody = {
      title,
      body: description
    }
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(requestBody)
    })
      .then((response) => response.json())
      .then(data => {
        if (data) {
          requestBody.id = messages.length + 1;
          let updatedMessages = [...messages, requestBody]
          setMessages(updatedMessages);
        }
      })
  }
  const updateMessage = () => {
    //Metodo PUT
    const requestBody = {
      title,
      body: description
    }
    fetch('https://jsonplaceholder.typicode.com/posts/' + selectedId, {
      method: 'PUT',
      body: JSON.stringify(requestBody)
    })
      .then((response) => response.json())
      .then(data => {
        if (data) {
          let updatedMessages = [...messages];
          let index = updatedMessages.findIndex((message) => message.id === selectedId);
          updatedMessages[index] = { ...updatedMessages[index], ...requestBody }
          setMessages(updatedMessages);
          setSelectedId(null);
          setTitle("");
          setDescription("")
        }
      })
  }
  const deleteMessage = (id) => {
    //Metodo DELETE 
    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(data => {
        if (data) {
          let updatedMessages = [...messages];
          let index = updatedMessages.findIndex((message) => message.id === id);
          updatedMessages.splice(index, 1);
          setMessages(updatedMessages);
        }
      })
  }
  const selectedMessage = (requestBody) => {
    setTitle(requestBody.title);
    setDescription(requestBody.description);
    setSelectedId(requestBody.id)
  }
  useEffect(() => {
    fetchMessages();
  }, [])
  return (
    <View>
      <Text style={styles.heading}>Recordatorios</Text>
      <View style={styles.form}>
        <TextInput placeholder='Titulo' style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)} />

        <TextInput placeholder='Descripción' style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)} />

        <TouchableOpacity style={styles.button} onPress={selectedId === null ? addMessage : updateMessage}>
          <Text style={styles.add}>{selectedId === null ? 'Añadir' : 'Actualizar'}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.list}>
        <FlatList
          data={messages}
          renderItem={({ item }) =>
            <Message
              {...item}
              selectedMessage={selectedMessage}
              deleteMessage={deleteMessage}
            />}
          ItemSeparatorComponent={() => (<View style={styles.border} />)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'purple',
    padding: 5
  },
  border: {
    borderWidth: 0.5,
    borderColor: 'lightgray',
  },
  input: {
    borderWidth: 2,
    padding: 10,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'purple',
    padding: 5,
    color: 'white'
  },
  add: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  form: {
    padding: 10,
    margin: 10,
    color: 'white'
  },
  list: {
    height: 500,
    color: 'white'
  }
})
