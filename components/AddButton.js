// components/AddButton.js
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.addButton}>
            <MaterialCommunityIcons name="plus" style={styles.plusIcon}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007bff',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusIcon: {
        color: 'white',
        fontSize: 30
    },
});

export default AddButton;
