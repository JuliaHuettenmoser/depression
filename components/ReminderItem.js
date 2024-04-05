import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReminderItem = ({ reminder, onDelete }) => {
    return (
        <View style={styles.reminderItem}>
            <View style={{flex: 1}}>
                <Text style={styles.reminderText}>{reminder.name}</Text>
                <Text style={styles.reminderSubText}>{reminder.time} - {reminder.weekdays.join(', ')}</Text>
            </View>
            <TouchableOpacity onPress={() => onDelete(reminder.id)} style={styles.deleteButton}>
                <MaterialCommunityIcons name="delete" size={24} color="#d11a2a" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    reminderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff', // White background for each item
        borderRadius: 12,
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 16,
        shadowColor: "#000", // Shadow for depth
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    reminderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333', // Darker text for better readability
    },
    reminderSubText: {
        fontSize: 14,
        color: '#666666', // Slightly lighter text for sub info
        marginTop: 4,
    },
    deleteButton: {
        marginLeft: 'auto', // Pushes the button to the end of the container
        padding: 8, // Easier to press
    },
});


export default ReminderItem;
