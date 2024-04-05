import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Alert, Appearance, Switch } from 'react-native';
import { googleDriveImport, googleDriveExport } from '../services/GoogleDriveService';
import { authorize } from 'react-native-app-auth'; // For OAuth

const MyComponent = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });
    return () => subscription.remove();
  }, []);

  // Placeholder function to initiate OAuth flow and get access token
  const getAccessToken = async () => {
    const config = {/* OAuth 2.0 config for your service */};
    try {
      const result = await authorize(config);
      return result.accessToken;
    } catch (error) {
      console.error(error);
      Alert.alert('Authorization Error', 'Failed to obtain access token.');
      return null;
    }
  };

  const handleImport = async () => {
    setStatusMessage('Importing...');
    const accessToken = await getAccessToken();
    if (accessToken) {
      const data = await googleDriveImport(accessToken);
      console.log('Imported data:', data);
      setStatusMessage('Data imported successfully.');
      // Process and display the data as needed
    } else {
      setStatusMessage('Failed to import data.');
    }
  };

  const handleExport = async () => {
    setStatusMessage('Exporting...');
    const accessToken = await getAccessToken();
    if (accessToken) {
      const fileData = 'Sample data to export';
      const fileName = 'SampleFile.txt';
      const data = await googleDriveExport(accessToken, fileData, fileName);
      console.log('Exported file:', data);
      setStatusMessage('Data exported successfully.');
      // Show success message or further process the response as needed
    } else {
      setStatusMessage('Failed to export data.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can implement logic here to toggle dark mode theme in your application
  };

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : null]}>
      <TouchableOpacity onPress={handleImport} style={styles.button}>
        <Text style={styles.buttonText}>Import from Google Drive</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleExport} style={styles.button}>
        <Text style={styles.buttonText}>Export to Google Drive</Text>
      </TouchableOpacity>
      <Text style={styles.statusMessage}>{statusMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#1f1f1f', // Dark mode background color
  },
  button: {
    backgroundColor: '#4aa9f7',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  statusMessage: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
  },
});

export default MyComponent;
