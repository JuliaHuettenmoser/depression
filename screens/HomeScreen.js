import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState('');
    const [markedDates, setMarkedDates] = useState({});

    const markDate = (mood) => {
        const color = moodColor(mood);
        const newMarkedDates = {
            ...markedDates,
            [selected]: { selected: true, color, textColor: 'white' }
        };
        setMarkedDates(newMarkedDates);
        setModalVisible(false);
    };

    const moodColor = (mood) => {
        switch (mood) {
            case 'happy': return '#98FB98'; // Pale Green
            case 'neutral': return '#FFD700'; // Gold
            case 'sad': return '#FF6347'; // Tomato
            case 'sick': return '#9370DB'; // Medium Purple
            default: return 'gray';
        }
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
                }}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
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
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Image
                            style={styles.modalImage}
                            source={{ uri: "https://media.tenor.com/lCKwsD2OW1kAAAAj/happy-cat-happy-happy-cat.gif" }}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    }
});
