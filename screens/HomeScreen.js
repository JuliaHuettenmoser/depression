import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
    const [selected, setSelected] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [dayNotes, setDayNotes] = useState({});

    const markDate = (mood) => {
        const color = moodColor(mood);
        // Now also keeping the existing note (if any) when marking a day
        const newMarkedDates = {
            ...markedDates,
            [selected]: { 
                selected: true, 
                color, 
                textColor: 'white',
                note: dayNotes[selected] // Save the note with the marked date
            }
        };
        setMarkedDates(newMarkedDates);
    };

    const moodColor = (mood) => {
        switch (mood) {
            case 'happy': return '#98FB98';
            case 'neutral': return '#FFD700';
            case 'sad': return '#FF6347';
            case 'sick': return '#9370DB';
            default: return 'gray';
        }
    };

    // Update dayNotes state when the text input changes
    const handleNoteChange = (text) => {
        setDayNotes({ ...dayNotes, [selected]: text });
    };

    return (
        <View style={styles.container}>
            <Calendar
                markingType={'period'}
                markedDates={markedDates}
                theme={{
                    selectedDayBackgroundColor: '#00adf5',
                    todayTextColor: '#00adf5',
                    arrowColor: 'gray',
                    selectedDayTextColor: "#00adf5",
                    selectedDayBackgroundColor: "green"
                }}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                enableSwipeMonths={true}
            />
            <Text style={styles.feelsTxt}>How are you feeling today?</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => markDate('happy')}>
                    <MaterialCommunityIcons name="emoticon-happy-outline" size={48} color={"#98FB98"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => markDate('neutral')}>
                    <MaterialCommunityIcons name="emoticon-neutral-outline" size={48} color={"#FFD700"}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => markDate('sad')}>
                    <MaterialCommunityIcons name="emoticon-sad-outline" size={48} color={"#FF6347"}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => markDate('sick')}>
                    <MaterialCommunityIcons name="emoticon-sick-outline" size={48} color={"#9370DB"}/>
                </TouchableOpacity>
            </View>
            {selected && ( // Display TextInput only if a day is selected
                <TextInput
                    style={styles.noteInput}
                    onChangeText={handleNoteChange}
                    value={dayNotes[selected] || ''} // Use existing note if available
                    placeholder="Enter your note here..."
                    multiline
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF', // AliceBlue
    },
    feelsTxt: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginLeft: 20,
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalImage: {
        width: 200, 
        height: 200,
        borderRadius: 10, // Add some rounded corners to the image
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#00adf5',
        padding: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    noteInput: {
        height: 100,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5, 
        borderColor: '#ccc',
        backgroundColor: 'white'
    }
});
