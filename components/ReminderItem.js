    // components/ReminderItem.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReminderItem = ({ reminder, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.pillbox}>
            <MaterialCommunityIcons name="pill" style={styles.pill}/>
            <Text style={styles.text}>{reminder.name}</Text>
            <View style={styles.details}>
                <Text style={styles.timer}>{reminder.time}</Text>
                <Text style={styles.weekday}>{reminder.weekday}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    pillbox: {
        backgroundColor: "#e3e3e3",
        borderRadius: 5,
        marginVertical: 5,
        padding: 10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 20,
        marginLeft: 10
    },
    pill: {
        color: "white",
        fontSize: 25
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timer: {
        fontSize: 16,
        marginRight: 10
    },
    weekday: {
        fontSize: 16
    },
});

export default ReminderItem;
