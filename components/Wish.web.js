import { StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';
import globals from '../global';
import { TouchableOpacity } from 'react-native';
import * as linking from 'expo-linking';

const Wish = (props) => {
    return (
        <TouchableOpacity
            onLongPress={() => props.edit(props)}
            onPress={() => linking.openURL(props.url)}
            style={styles.container}
        >
            <View style={styles.info}>
                <Text style={globals.h2}>{props.title}</Text>
                <Text>{props.desc}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Wish;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 2,
        maxWidth: 500,
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});
