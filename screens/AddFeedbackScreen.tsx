import React, {useState} from "react";
import {Text,View,StyleSheet,Alert, TouchableNativeFeedback} from "react-native";
import { AppButton, InputWithLabel } from "../components/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LogBox } from 'react-native';
let config = require('../Config');

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const AddFeedback = ({navigation}:any) =>{
    const [feedback,setFeedback] = useState('');

    const handleFeedback = () => {
        if (feedback.length == 0) {
            Alert.alert('Warning', 'Please fill in your feedback');
            return;
        }
        let url = config.settings.serverPath + '/api/feedbacks';

        fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
      
            body: JSON.stringify({
              feedback: feedback,
            }),
          }).then((response) => {
            if (!response.ok) {
              Alert.alert('Error', response.status.toString());
              throw Error('Error: ' + response.status);
            }
      
            return response.json()
          }).then((responseJson) => {
            if (responseJson.affected > 0) {
              setFeedback('');
              navigation.goBack();
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
    }

    
    return(
            <View style={styles.container}>
              <View style={{marginTop:40,paddingBottom:0,position:'absolute'}}>
              <Ionicons 
                style={styles.icon}
                name="heart-circle-outline" 
                size={50} 
                color='#493C15'
                  />
                  </View>
                  <View style={{marginTop:0,paddingTop:80}}>
              <Text style={styles.TextTitle}>Help Us Improve!</Text>
                <InputWithLabel
                    style ={styles.InputBackground}
                    textLabelStyle={styles.TextLabel}
                    textInputStyle={styles.TextInput}
                    placeholder={'Leave your comment here.'}
                    value={feedback}
                    
                    multiline={true}
                    onChangeText={setFeedback}

                    
                          />  
                          </View>  
                <View style={{marginTop:340}}>
                <AppButton title='Add Feedback' onPress={handleFeedback} />    
                </View> 
                                                 
            </View>

            
            
  

    );
}

const styles = StyleSheet.create({
    icon:{
      alignSelf:'center',
    },
    InputBackground:{
      marginTop: 20,
      backgroundColor:'#ffffc6',
      borderRadius:50,
      width:350,
      height:400,
    },
    container: {
      flex: 1,
      bottom:0,
      alignItems: 'center',
      backgroundColor: '#f7e8a9',
    },
    TextLabel: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 4,
        textAlignVertical: 'center',
      },
      TextTitle:{
        fontSize: 20,
        marginTop:30,
        fontWeight: 'bold',
        marginLeft: 3,
        textAlignVertical: 'center',
        alignSelf:'center'
      },
    
      TextInput: {
        position:'absolute',
        fontSize: 24,
        color: '#000099',
      },
  })


  
  
  
  
export default AddFeedback; 