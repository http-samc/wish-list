import { ActivityIndicator, StyleSheet, Text, Platform, View, TextInput, KeyboardAvoidingView } from 'react-native';
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
import { BottomSheet } from 'react-native-btr';

const List = () => {
    const [loading, setLoading] = useState(true)
    const [wishes, setWishes] = useState([])
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
    const [doc, setDoc] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [url, setUrl] = useState('');
    const navigation = useNavigation();

    const toggleBottomSheet = () => {
        setBottomSheetVisible(!bottomSheetVisible)
    }

    const getWishes = async () => {
        const snapshot = await firestore.collection(`${auth.currentUser.uid}`).get()
        const wishes = snapshot.docs.map(doc => {
            let base = doc.data();
            base.id = doc.id;
            return base
        })
        setWishes(wishes)
        setLoading(false)
    }

    const newWish = async () => {
        try {
            const newWish = {
                title,
                desc,
                url,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
            await firestore.collection(`${auth.currentUser.uid}`).add(newWish)
            getWishes()
            setTitle('')
            setDesc('')
            setUrl('')
            toggleBottomSheet()
        } catch (error) {
            alert(error.message)
        }
    }

    const editWish = async () => {
        try {
            const newWish = {
                title,
                desc,
                url,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
            await firestore.collection(`${auth.currentUser.uid}`).doc(doc.id).update(newWish)
            getWishes()
            setTitle('')
            setDesc('')
            setUrl('')
            toggleBottomSheet()
        } catch (error) {
            alert(error.message)
        }
    }

    const deleteWish = async () => {
        try {
            await firestore.collection(`${auth.currentUser.uid}`).doc(doc.id).delete()
            getWishes()
            setTitle('')
            setDesc('')
            setUrl('')
            toggleBottomSheet()
        } catch (error) {
            alert(error.message)
        }
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
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container}>
                <Text style={globals.h1}>{displayName}'s Wish List 📝</Text>


                <ScrollView style={styles.wishContainer} contentContainerStyle={styles.wishWrapper}>
                    {wishes.length > 0
                        ? (wishes.map((wish, idx) => {
                            return (
                                <Wish
                                    id={wish.id}
                                    key={idx}
                                    title={wish.title}
                                    desc={wish.desc}
                                    url={wish.url}
                                    edit={
                                        (props) => {
                                            setDoc(props)
                                            setTitle(props.title)
                                            setDesc(props.desc)
                                            setUrl(props.url)
                                            toggleBottomSheet()
                                        }}
                                />
                            )
                        }))
                        : <Text style={globals.h2}>You have no wishes!</Text>
                    }
                </ScrollView>
                <BottomSheet
                    visible={bottomSheetVisible}
                    onBackButtonPress={toggleBottomSheet}
                    onBackdropPress={toggleBottomSheet}
                >
                    <View style={styles.bottomSheet}>
                        <KeyboardAvoidingView
                            behavior={(Platform.OS == "ios" ? "padding" : undefined)}
                        >
                            <Text style={globals.h2}>{doc ? 'Edit Wish' : 'Create Wish'}</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Title"
                                    placeholderTextColor="grey"
                                    value={title}
                                    onChangeText={(text) => setTitle(text)}
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Description"
                                    placeholderTextColor="grey"
                                    value={desc}
                                    onChangeText={(text) => setDesc(text)}
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="URL"
                                    placeholderTextColor="grey"
                                    value={url}
                                    onChangeText={(text) => setUrl(text)}
                                    autoCapitalize="none"
                                    style={styles.input}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        doc
                                            ? editWish()
                                            : newWish()
                                    }
                                }
                                style={styles.submit}
                            >
                                <Text>Submit</Text>
                            </TouchableOpacity>
                            {
                                doc ? (
                                    <TouchableOpacity
                                        onPress={deleteWish}
                                        style={styles.submit}
                                    >
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                ) : null
                            }
                        </KeyboardAvoidingView>
                    </View>
                </BottomSheet>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                    <TouchableOpacity
                        onPress={() => {
                            auth.signOut()
                            navigation.navigate('Authenticate - Wish List')
                        }}
                        style={styles.newWish}
                    >
                        <AntDesign name="export2" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.newWish}
                        onPress={
                            () => {
                                setDoc(null)
                                setTitle('')
                                setDesc('')
                                setUrl('')
                                toggleBottomSheet()
                            }
                        }
                    >
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        </View>
    );
};

export default List;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#87ceeb',
        height: '100%',
    },
    container: {
        width: '100%',
        maxWidth: 400,
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20
    },
    newWish: {
        marginRight: 10,
        backgroundColor: '#87ceeb',
        padding: 10,
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 1
    },
    wishContainer: {
        marginVertical: 15,
        width: '100%',
    },
    wishWrapper: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        width: 400,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 15,
        alignSelf: 'center',
    },
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 5,
    },
    input: {
        width: '100%',
        borderBottomColor: 'black',
        borderWidth: 1,
        marginVertical: 2,
        padding: 5,
        borderRadius: 5,
    },
    submit: {
        backgroundColor: '#87ceeb',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 1,
    }
});
