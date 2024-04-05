import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Appearance } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
    const [selected, setSelected] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [dayNotes, setDayNotes] = useState({});

    const markDate = (mood) => {
        const color = moodColor(mood);
        const newMarkedDates = {
            ...markedDates,
            [selected]: { 
                selected: true, 
                color, 
                textColor: 'white',
                note: dayNotes[selected]
            }
        };
        setMarkedDates(newMarkedDates);
    };

    const moodColor = (mood) => {
        switch (mood) {
            case 'happy': return '#78D878';
            case 'neutral': return '#FFD700';
            case 'sad': return '#FF8787';
            case 'sick': return '#B0A4E3';
            default: return 'gray';
        }
    };

    const handleNoteChange = (text) => {
        setDayNotes({ ...dayNotes, [selected]: text });
    };

    return (
        <View style={styles.container}>
            <Calendar
                markingType={'period'}
                markedDates={markedDates}
                theme={{
                    selectedDayBackgroundColor: '#4aa9f7',
                    todayTextColor: '#4aa9f7',
                    arrowColor: '#4aa9f7',
                    selectedDayTextColor: "#ffffff",
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                }}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                enableSwipeMonths={true}
            />
            <Text style={styles.feelsTxt}>How are you feeling today?</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => markDate('happy')}>
                    <MaterialCommunityIcons name="emoticon-happy-outline" size={48} color={"#78D878"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => markDate('neutral')}>
                    <MaterialCommunityIcons name="emoticon-neutral-outline" size={48} color={"#FFD700"}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => markDate('sad')}>
                    <MaterialCommunityIcons name="emoticon-sad-outline" size={48} color={"#FF8787"}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => markDate('sick')}>
                    <MaterialCommunityIcons name="emoticon-sick-outline" size={48} color={"#B0A4E3"}/>
                </TouchableOpacity>
            </View>
            {selected && (
                <TextInput
                    style={styles.noteInput}
                    onChangeText={handleNoteChange}
                    value={dayNotes[selected] || ''}
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
        backgroundColor: '#F8F8F8',
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
