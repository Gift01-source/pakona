import React, { useState, useEffect, Text, View, ScrollView,Stylesheet,ActivityIndicator } from 'react';
import axios from 'axios';


const Messages = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/messages/${userId}`)
      .then((response) => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching messges:', error);
        setLoading(false);
      });
    },[userId]);

    if(loading) {
      return <ActivityIndicator size="large" color="0000" style={{marginTop:40}}/>;
    }

    return (
      <ScrollView style={ styles.container }>
        <Text style={styles.header}>Messages</Text>
        {messages.map(msg=>(
          <View key={msg.id} style={styles.messageBox}>
            <Text style={styles.sender}>{msg.sender_id===userId?'You': `User ${msg.sender_id}`}:</Text>
            <Text style={styles.message}>{msg.message}</Text>
            <Text style={styles.time}>{new Date(msg.timestamp).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

    
const styles = Stylesheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  messageBox: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sender: {
    fontWeight: 'bold',
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
   /*{/* const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/messages', {
        content: newMessage,
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};*/

