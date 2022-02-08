import { StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';
import globals from '../global';
import { TouchableOpacity } from 'react-native';
import * as linking from 'expo-linking';
import { LinkPreview } from '@flyerhq/react-native-link-preview'

const Wish = (props) => {
    console.log(props)
    return (
        <TouchableOpacity
            onLongPress={() => props.edit(props)}
            onPress={() => linking.openURL(props.url)}
            style={styles.container}
        >
            <LinkPreview
                text={props.url}
                renderText={(t) => null}
                renderTitle={(t) => null}
                renderDescription={(d) => null}
                renderImage={(i) => <View><Image style={{ width: 30, height: 30 }} source={{ uri: i.url }} /></View>}
                containerStyle={{
                    height: 20,
                    marginTop: -30,
                }}
            />
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 2,
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100%',
        marginLeft: 10,
    }
});
