import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function Message({ id, userId, body, title, selectedMessage, deleteMessage }) {
  return (
    <View style={styles.message}>
      <Text style={styles.heading}>{id}.{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Button title='Editar' onPress={() => selectedMessage({ id, title, description: body })} />
      <Button title='Eliminar' color='red' onPress={() => deleteMessage(id)} />
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    padding: 10,
    color: 'white',
    fontStyle: 'bold'
  },
  body: {
    fontSize: 14,
    padding: 5,
    color: 'white'
  },
  message: {
    padding: 10,
    margin: 10
  }
})