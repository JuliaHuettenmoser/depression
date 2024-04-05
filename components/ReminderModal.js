import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Appearance } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ReminderModal = ({ visible, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [selectedWeekdays, setSelectedWeekdays] = useState([]);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);

    const toggleWeekday = (weekday) => setSelectedWeekdays(prev => prev.includes(weekday) ? prev.filter(day => day !== weekday) : [...prev, weekday]);

    const saveReminder = () => {
        if (!name || !time || selectedWeekdays.length === 0) {
            alert('Please fill in all fields.');
            return;
        }
        onSave({ id: Math.random(), name, time, weekdays: selectedWeekdays });
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setTime('');
        setSelectedWeekdays([]);
        onClose();
    };

    const showTimePicker = () => setTimePickerVisible(true);
    const hideTimePicker = () => setTimePickerVisible(false);

    const handleTimeConfirm = (selectedTime) => {
        hideTimePicker();
        setTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={resetForm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Add Reminder</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Name"
                    />
                    <View style={styles.timeContainer}>
                        <TouchableOpacity onPress={showTimePicker} style={styles.timeButton}>
                            <Text style={styles.timeButtonText}>Pick Time</Text>
                        </TouchableOpacity>
                        <Text style={styles.selectedTime}>Selected Time: {time}</Text>
                    </View>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                    />
                    <Text style={styles.weekdaysText}>Select Weekdays:</Text>
                    <ScrollView style={styles.weekdayList}>
                        {weekdays.map((weekday) => (
                            <TouchableOpacity key={weekday} onPress={() => toggleWeekday(weekday)} style={styles.weekdayItem}>
                                <View style={selectedWeekdays.includes(weekday) ? styles.checkboxSelected : styles.checkbox}></View>
                                <Text style={styles.weekdayName}>{weekday}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={saveReminder} style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={resetForm} style={[styles.button, styles.cancelButton]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    timeContainer: {
        marginBottom: 15,
    },
    timeButton: {
        backgroundColor: '#4aa9f7',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    timeButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    selectedTime: {
        marginBottom: 5,
    },
    weekdaysText: {
        marginBottom: 5,
    },
    weekdayList: {
        maxHeight: 150,
        marginBottom: 15,
    },
    weekdayItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#4aa9f7',
        marginRight: 10,
        borderRadius: 5,
    },
    checkboxSelected: {
        width: 20,
        height: 20,
        backgroundColor: '#4aa9f7',
        marginRight: 10,
        borderRadius: 5,
    },
    weekdayName: {
        marginRight: 10,
    },
    button: {
        backgroundColor: '#4aa9f7',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ReminderModal;
