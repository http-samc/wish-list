import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { auth, firestore, firebase } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import globals from '../global';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Wish from '../components/Wish';

const List = () => {
    const [loading, setLoading] = useState(true)
    const [wishes, setWishes] = useState([])

    const getWishes = async () => {
        const snapshot = await firestore.collection(`${auth.currentUser.uid}`).get()
        const wishes = snapshot.docs.map(doc => doc.data())
        setWishes(wishes)
        setLoading(false)
    }

    useEffect(() => { getWishes() }, [loading])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <ActivityIndicator />
            </View>
        )
    }
    let displayName = auth.currentUser.email.split('@')[0].charAt(0).toUpperCase() + auth.currentUser.email.split('@')[0].slice(1)

    return (
        <SafeAreaView style={styles.container}>
            <Text style={globals.h1}>{displayName}'s Wish List.</Text>
            <TouchableOpacity style={styles.newWish}>
                <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView style={styles.wishContainer} contentContainerStyle={styles.wishWrapper}>
                {wishes.length > 0
                    ? wishes.map((wish, index) => { })
                    : <Text style={globals.h2}>You have no wishes!</Text>
                }
                <Wish id={0} title="Wish 1" desc="This is a description" url="https://google.com" edit={(id) => console.log(id)} />
            </ScrollView>
            <Text>Log Out</Text>
        </SafeAreaView>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    newWish: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        zIndex: 2,
        backgroundColor: '#87ceeb',
        padding: 10,
        borderRadius: 50,
    },
    wishContainer: {
        marginVertical: 15,
        width: '100%',
    },
    wishWrapper: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});
