import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, TouchableNativeFeedback } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppButton, InputWithLabel } from "../components/style";

let config = require('../Config');



const ProfileScreen = ({ navigation }: any) => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    syncUser();
  }, [])

  const syncUser = async () => {
    try {
      await AsyncStorage.getItem('UserData')
        .then(value => {
          if (value != null) {
            let user = JSON.parse(value);
            setName(user.Name);
            setUsername(user.Username);
            setPassword(user.Password);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  const saveUser = async () => {
    try {
      var User = {
        Name: name,
        Username: username,
        Password: password,
      }
      await AsyncStorage.setItem('UserData', JSON.stringify(User));
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = () => {
    let url = config.settings.serverPath + '/api/users/' + username;

    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        password: password,
        username: username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Error in updating: ', response.status.toString());
          throw Error('Error in updating: ' + response.status);
        }

        return response.json()
      })
      .then((responseJson) => {
        if (responseJson.affected > 0) {
          Alert.alert('Successfully Changed');

          saveUser();
        }
        else {
          Alert.alert('Error in changing.');
        }
      })
      .catch((error) => {
        console.error(error);
      });


  }
  const deleteAcc = () => {
    let url = config.settings.serverPath + '/api/users/' + username;

    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Error in updating: ', response.status.toString());
          throw Error('Error in updating: ' + response.status);
        }

        return response.json()
      })
      .then((responseJson) => {
        if (responseJson.affected > 0) {
          navigation.navigate('LogInScreen');
        }
        else {
          Alert.alert('Error in deleting.');
        }
      })
      .catch((error) => {
        console.error(error);
      });


  }
  return (

    <View style={styles.container}
    >
      <View style={{ marginTop: 50 }}>
        <Ionicons
          style={styles.icon}
          name="person-circle-outline"
          size={50}
          color='#493C15'
        />
      </View>
      <View style={{ margin: 20 }}>
        <InputWithLabel
          style={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.TextLabel}
          editable={true}
          label="Name"
          placeholder={'type name here'}
          onChangeText={(name: any) => {
            setName(name);
          }}>
          
          <Text style={styles.Name}>
            {name}
          </Text>
          

        </InputWithLabel>


        <InputWithLabel
          style={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.TextLabel}
          editable={false}
          label="Username">
          <Text style={styles.Name}>
            {username}
          </Text>

        </InputWithLabel>

        <InputWithLabel
          style={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.TextLabel}
          editable={true}
          label='Password'
          placeholder={'type password here'}
          onChangeText={(password: any) => {
            setPassword(password);
          }}>
          <Text style={styles.Name}>
            {password}
          </Text>

        </InputWithLabel>
      </View>
      <View style={{ marginBottom: 60 }}>
        <AppButton
          onPress={handleChange}
          title='Change Profile'
        />
        <AppButton
          onPress={deleteAcc}
          title='Delete Account'
        />
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
  InputBackground: {
    backgroundColor: '#ffffc6',
    borderRadius: 50,
    width: 350
  }
  ,
  container: {

    flex: 1,
    bottom: 0,
    justifyContent: 'flex-end',//stick to bottom
    alignItems: 'center',
    backgroundColor: '#f7e8a9'
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center'
  },

  TextInput: {
    position: 'absolute',
    fontSize: 24,
    color: '#000099',
  },
  profilePic: {
    position: 'absolute',
    borderRadius: 100,
    top: '3%',
    left: '7%',
  },
  name: {
    position: 'absolute',
    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#4287f5',
    top: '3%',
    left: '35%',
  },
  email: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#666b73',
    top: '9%',
    left: '35%',
  },
  genderAndAge: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#2ac41f',
    top: '14%',
    left: '35%',
  },
  graphTitle: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#e26a00',
    bottom: '15%',
  },
  logOutButton: {
    position: 'absolute',
    bottom: '1%',
    width: '28%',
    height: '12%',
    left: '15%',
    backgroundColor: '#ff7da0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePasswordButton: {
    position: 'absolute',
    bottom: '1%',
    width: '28%',
    height: '12%',
    right: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePasswordText: {
    fontSize: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
  Name: {
    color: '#493D15',
    fontSize: 15,
    fontStyle: 'italic',
  }
})


export default ProfileScreen;