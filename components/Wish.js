import { StyleSheet, Text, Touchable, View } from 'react-native';
import React from 'react';
import globals from '../global';
import { TouchableOpacity } from 'react-native';
import * as linking from 'expo-linking';

const Wish = (props) => {
    return (
        <TouchableOpacity
            onLongPress={() => props.edit(props.id)}
            onPress={() => linking.openURL(props.url)}
            style={styles.container}
        >
            <Text style={globals.h2}>{props.title}</Text>
            <Text>{props.desc}</Text>
        </TouchableOpacity>
    );
};

export default Wish;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    }
});
