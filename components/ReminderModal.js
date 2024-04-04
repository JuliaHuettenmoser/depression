import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
        // Format time to exclude seconds
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
                    <Text>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <Button title="Pick Time" onPress={showTimePicker} />
                    <Text>Selected Time: {time}</Text>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                    />
                    <Text>Weekdays:</Text>
                    <ScrollView style={styles.weekdayList}>
                        {weekdays.map((weekday) => (
                            <TouchableOpacity key={weekday} onPress={() => toggleWeekday(weekday)} style={styles.weekdayItem}>
                                <View style={selectedWeekdays.includes(weekday) ? styles.checkboxSelected : styles.checkbox}></View>
                                <Text style={{ marginRight: 10 }}>{weekday}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={saveReminder} style={styles.saveButton}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={resetForm} style={styles.cancelButton}>
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    weekdayList: {
        maxHeight: 150,
        marginTop: 10,
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
        borderColor: '#000',
        marginRight: 10,
    },
    checkboxSelected: {
        width: 20,
        height: 20,
        backgroundColor: '#007bff',
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    },
    cancelButton: {
        backgroundColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
});

export default ReminderModal;
