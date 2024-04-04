// EditWeekdayScreen.js

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function EditWeekday({ navigation, route }) {
    const { setWeekday } = route.params;

    return (
        <View style={styles.container}>
            {weekdays.map(day => (
                <TouchableOpacity
                    key={day}
                    style={styles.weekdayButton}
                    onPress={() => {
                        setWeekday(day);
                        navigation.goBack();
                    }}
                >
                    <Text>{day}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    weekdayButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
});
