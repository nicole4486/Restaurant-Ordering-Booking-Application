import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
let config = require('../Config');

const Signup = ({navigation}:any) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');   

    const handleSignup = () => {
        if (name.length == 0) {
            Alert.alert('Warning', 'Please fill in your name');
            return;
        }
        if (username.length == 0) {
            Alert.alert('Warning', 'Please fill in your username');
            return;
        }
      
        if (password.length == 0) {
            Alert.alert('Warning', 'Please fill in your password');
            return;
        }        
      
        let url = config.settings.serverPath + '/api/users';
        fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
      
            body: JSON.stringify({
              name: name,
              username: username,
              password: password,
            }),
          }).then((response) => {
            if (!response.ok) {
              Alert.alert('Error', response.status.toString());
              throw Error('Error: ' + response.status);
            }
      
            return response.json()
          }).then((responseJson) => {
            if (responseJson.affected > 0) {
              navigation.goBack()
            }
            else {
              console.log('respond')
              console.log(responseJson.affected);
              Alert.alert('Error saving record');
            }
          })
            .catch((error) => {
              console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('./../assets/logo.jpg')} />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="name"
                    value={name}
                    onChangeText={setName}
                />
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#f7e8a9'
    },
    inputContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    image:{
        alignSelf: 'center',
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginTop: 20,
        borderRadius:50
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor:'#FFFFE4'
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#af974d',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
  })

export default Signup;
