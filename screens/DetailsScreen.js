import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Appearance
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
      <StatusBar barStyle="light-content" backgroundColor="#4aa9f7" />
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Reminders</Text>
        <TouchableOpacity onPress={handleAddReminder}>
          <MaterialCommunityIcons name="plus-circle" size={30} color="#ffffff" />
        </TouchableOpacity>
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
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#4aa9f7',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
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
  }
});
