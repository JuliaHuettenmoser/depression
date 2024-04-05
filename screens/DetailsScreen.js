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
import ReminderItem from '../components/ReminderItem'; // Make sure the path is correct

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

  const handleDeleteReminder = (id) => {
    setReminders(currentReminders => currentReminders.filter(reminder => reminder.id !== id));
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
          <ReminderItem
            reminder={item}
            onDelete={handleDeleteReminder}
          />
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
    backgroundColor: '#f7f7f7', // A softer background color
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#007bff', // A vibrant header color
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000", // Adding shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#28a745', // A lively green for the add button
    padding: 15,
    borderRadius: 30, // Making it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
    shadowColor: "#000", // Adding shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
