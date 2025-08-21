
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Messages = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http:                                         
      .then((response) => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('`http:                                         
      .then((response) => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color=0000"                                  
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      {messages.map(msg => (
        <View key={msg.id} style={styles.messageBox}>
          <Text style={styles.sender}>{msg.sender_id === userId ? 'You' : `' : `User ${msg.sender_id}`}:</Text>
          <Text style={styles.message}>{msg.message}</Text>
          <Text style={styles.time}>{new Date(msg.timestamp).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: ''      
  },
  header: {
    fontSize: 24,
    fontWeight: ''bold'',
    marginBottom: 16,
  },
  messageBox: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: ''      
  },
  sender: {
    fontWeight: ''bold'',
  },
  message: {
    marginVertical: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default Messages;
