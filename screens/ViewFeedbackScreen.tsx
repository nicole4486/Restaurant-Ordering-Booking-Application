import React, {useState,useEffect} from "react";
import {FlatList,Text,View,StyleSheet,Alert} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Ionicons from "react-native-vector-icons/Ionicons";
let config = require('../Config');


const ViewFeedback = () =>{
    const [feedback,setFeedback] = useState([]);

    const _load = () => {
        
        let url = config.settings.serverPath + '/api/feedbacks';

        fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
              Alert.alert('Error', response.status.toString());
              throw Error('Error: ' + response.status);
            }      
            return response.json()
          }).then((feedback) => {
            setFeedback(feedback);
        }).catch((error) => {
              console.error(error);
            });
    }

    useEffect(()=>{
        _load();

        const intervalId = setInterval(_load, 5000);

        // Clean up function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    },[]);



    return(
          
            <View style={styles.container}>
              
              <View style={{marginTop:40,paddingBottom:0}}>
              <Ionicons 
                style={styles.icon}
                name="mail-open-outline" 
                size={50} 
                color='#493C15'
                  />
                  </View>
                  <View style={{marginTop:0}}>
              <Text style={styles.TextTitle}>Look at our feedbacks :</Text>
                <FlatList 
                    data={feedback}
                    renderItem={({item}: any) => (
                <View style={styles.feedbackItem}>
                    <Text style={styles.TextLabel}>{item.feedback}</Text>
                    
                </View>
                
                
            )}
        />           
        </View>                         
            </View>
          

    );
}

const styles = StyleSheet.create({
  icon:{
    alignSelf:'center',
  },
    InputBackground:{

      backgroundColor:'#ffffc6',
      borderRadius:50,
      width:350,
      height:80,
    },
    container: {
      flex: 1,
      bottom:0,
      backgroundColor: '#f7e8a9',
    },
    TextTitle:{
      fontSize: 20,
      marginTop:30,
      fontWeight: 'bold',
      marginLeft: 3,
      textAlignVertical: 'center',
      alignSelf:'center'
    },
    TextLabel: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 3,
        textAlignVertical: 'center',
      },
    
      TextInput: {
        position:'absolute',
        fontSize: 24,
        color: '#000099',
      },
      feedbackItem:{
        marginBottom :5,
        backgroundColor:'#ffffc6',
        padding:15,
        borderRadius:20,
        alignSelf:'center',
        width:370,
        margin:10
      },
      
  })

export default ViewFeedback; 