import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Appearance } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { sendEmail } from '../components/sendEmail'; // Adjust the path as necessary

const SicknessDropdown = () => {
  const [selectedSickness, setSelectedSickness] = useState(null);
  const [message, setMessage] = useState('');

  const sicknesses = [
    { label: 'Erkältung', value: 'cold' },
    { label: 'Grippe', value: 'flu' },
    { label: 'Fieber', value: 'fever' },
  ];

  const handleSicknessChange = (itemValue) => {
    setSelectedSickness(itemValue);
    switch (itemValue) {
      case 'cold':
        setMessage('Sehr geehrte Damen und Herren\nIch habe eine Erkältung und kann nicht zur Arbeit kommen.');
        break;
      case 'flu':
        setMessage('Sehr geehrte Damen und Herren\nIch habe die Grippe und kann nicht zur Arbeit kommen.');
        break;
      case 'fever':
        setMessage('Sehr geehrte Damen und Herren\nIch habe Fieber und kann nicht zur Arbeit kommen.');
        break;
      default:
        setMessage('');
    }
  };

  const handleSendEmail = () => {
    if (!message) {
      alert('Bitte wählen Sie eine Krankheit aus und/oder fügen Sie eine Nachricht hinzu.');
      return;
    }
    sendEmail(
      'thesnailgarry551@gmail.com', // Receiver's email address
      'Krankmeldung', // Subject
      message, // Email Body
      { cc: 'weitere@domain.com' } // Optional: CC addresses
    ).then(() => {
      console.log('Email successfully sent!');
    }).catch((error) => {
      console.error('Failed to send email:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Krankmeldung</Text>
      <Picker
        selectedValue={selectedSickness}
        onValueChange={handleSicknessChange}
        style={styles.picker}
        mode="dropdown" // Android only
      >
        <Picker.Item label="Krankheit auswählen" value={null} />
        {sicknesses.map((sickness, index) => (
          <Picker.Item key={index} label={sickness.label} value={sickness.value} />
        ))}
      </Picker>
      {selectedSickness && (
        <View style={styles.messageContainer}>
          <TextInput
            editable
            multiline
            value={message}
            onChangeText={setMessage}
            placeholder='Schreiben Sie hier Ihre Nachricht'
            style={styles.message}
          />
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
        <Text style={styles.buttonText}>Senden</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SicknessDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4aa9f7',
  },
  picker: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  messageContainer: {
    marginBottom: 20,
  },
  message: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4aa9f7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
