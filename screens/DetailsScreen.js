import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ReminderModal from '../components/ReminderModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DetailsScreen() {
  const [reminders, setReminders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddReminder = () => {
    setIsModalVisible(true);
  };

  const handleSaveReminder = (reminder) => {
    setReminders(currentReminders => [...currentReminders, reminder]);
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Your Reminders</Text>
      </View>
      <FlatList
        data={reminders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>{item.name}</Text>
            <Text style={styles.reminderSubText}>{item.time} - {item.weekdays.join(', ')}</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleAddReminder} style={styles.addButton}>
        <MaterialCommunityIcons name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>
      <ReminderModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveReminder}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Lighter background
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20, // Increased padding
    paddingBottom: 20,
    backgroundColor: '#0056b3', // A bit deeper blue
    borderBottomLeftRadius: 25, // More pronounced rounded corners
    borderBottomRightRadius: 25,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  reminderItem: {
    backgroundColor: '#ffffff', // Ensure high contrast for readability
    padding: 25, // More spacious padding
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20, // More rounded corners
    elevation: 5, // Higher elevation for more pronounced shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
  },
  reminderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reminderSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50', // A fresher green
    padding: 20, // Larger touch area
    borderRadius: 60, // Perfect circle with increased size
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25, // Slightly more offset from the bottom
    right: 25,
    elevation: 6, // More pronounced elevation
  },
});
