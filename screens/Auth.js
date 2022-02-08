import { StyleSheet, Text, Platform, View, KeyboardAvoidingView, TextInput } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import globals from '../global';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../firebase'
import { TouchableOpacity } from 'react-native';

const wrongPassword = 'auth/wrong-password';
const notFound = 'auth/user-not-found';
const badEmail = 'auth/invalid-email';
const badPass = 'auth/weak-password';

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("List")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => {
                if (error.message.includes(wrongPassword))
                    alert('Incorrect password!')
                else if (error.message.includes(notFound))
                    alert('User not found! Check that your email is correct.')
                else if (error.message.includes(badEmail))
                    alert('Please enter a valid email address!')
                else if (error.message.includes(badPass))
                    alert('Passwords must be at least 6 characters long,')
                else
                    alert('Unknown error. Please make sure you are connected to the Internet.')
            });
    }

    const handleSignIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => {
                if (error.message.includes(wrongPassword))
                    alert('Incorrect password!')
                else if (error.message.includes(notFound))
                    alert('User not found! Check that your email is correct.')
                else if (error.message.includes(badEmail))
                    alert('Please enter a valid email address!')
                else if (error.message.includes(badPass))
                    alert('Passwords must be at least 6 characters long,')
                else
                    alert('Unknown error. Please make sure you are connected to the Internet.')
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={(Platform.OS == "ios" ? "padding" : undefined)}
        >
            <SafeAreaView style={styles.container}>
                <Text style={globals.h1}>Welcome to Wish List ✨</Text>
                <Text style={globals.h2}>Please Authenticate Below</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="email"
                        placeholderTextColor="grey"
                        autoCapitalize='none'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="password"
                        placeholderTextColor="grey"
                        autoCapitalize='none'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                        <Text>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Auth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 200,
        borderBottomColor: 'black',
        borderWidth: 1,
        marginVertical: 2,
        padding: 5,
        borderRadius: 5,
    },
    buttonContainer: {
        width: 300,
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 95,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 5,
        backgroundColor: '#87ceeb',
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
