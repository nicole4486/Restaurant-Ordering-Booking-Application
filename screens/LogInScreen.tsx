import React, { useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let config = require('../Config');

const LogInScreen = ({navigation }:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    syncUser();
  }, [])

  const syncUser = () => {
    try {
      AsyncStorage.getItem('UserData')
        .then(value => {
          if (value != null) {
            navigation.navigate("Home");
          }
        }

        )
    } catch (error) {
      console.log(error);
    }
  }

  const saveUser = async (user : any) => {
    try {
      var User = {
        Name: user.name,
        Username: user.username,
        Password: user.password,
      }
      console.log('Username:', User.Username);
      await AsyncStorage.setItem('UserData', JSON.stringify(User));
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = () => {

    if (username.length == 0 || password.length == 0) {
        Alert.alert('Warning', 'Please fill in email / password!');
        return;
      }
    let url = config.settings.serverPath + '/api/users/' +  username;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Warning', 'No account found. Please register an account');
          throw Error('Error: ' + response.status);
        }
        return response.json();
      })
      .then(user => {
        if (user != null) {
          if (password === user.password) {
            setUser(user);
            saveUser(user);
            navigation.navigate("Home")
          } else {
            Alert.alert('Warning', 'Incorrect password. Please try again');
          }
        } else {
          Alert.alert('Warning', 'No account found. Please register an account');
        }
      })
      .catch(error => {
        console.error(error);
      });
    
  };
  return (
    <View style={styles.container}>
        <Image style= {styles.image} source = {require('./../assets/logo.jpg')} />
        <View style={styles.inputContainer}>   
            <TextInput
                style = {styles.input}
                placeholder= "username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style = {styles.input}
                placeholder= "password"
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
             </TouchableOpacity>
            <View style={{flexDirection:'row',justifyContent:'center', marginBottom:30}}>
                <Text>New to the app? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style= {{color:'blue', fontWeight: '500'}}>Register</Text>
                </TouchableOpacity>

            </View>
        </View>
        

    </View>
);

}

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
export default LogInScreen