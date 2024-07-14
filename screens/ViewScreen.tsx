import React, { useEffect, useState } from "react";
import {Alert, ScrollView, StyleSheet, Text,View} from "react-native";
import { LogBox } from 'react-native';
let config = require('../Config');

import { AppButton, InputWithLabel } from "../components/style";
import Ionicons from "react-native-vector-icons/Ionicons";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ViewScreen = ({route,navigation}:any) => {

    const [itemId, setId] = useState(route.params.id);
    const [username,setName] = useState(route.params.username);
    const [item ,setItem] = useState<any>();


    const addToCart = ()=>{

        let url = config.settings.serverPath + '/api/orders';
            fetch(url, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
          
                body: JSON.stringify({
                  item_id: itemId,
                  username: username,
                  //user_id: user_id,
                  
                }),
              }).then((response) => {
                if (!response.ok) {
                  Alert.alert('Error', response.status.toString());
                  throw Error('Error: ' + response.status);
                }
                Alert.alert('Add Successfully');
                navigation.goBack();
                return response.json()
              }).catch((error) => {
                  console.error(error);
                });
    
    }

    useEffect(()=>{
        _loadByID();
      },[]);
    
      const _loadByID = () => {
        let url = config.settings.serverPath + '/api/items/' + itemId;
        console.log(url);
        fetch(url)
          .then(response => {
            if (!response.ok) {
              Alert.alert('Error:', response.status.toString());
              throw Error('Error ' + response.status);
            }
            return response.json();
          })
          .then(items => {
            setItem(items);
            console.log(items);
          })
          .catch(error => {
            console.error(error);
          });
      }
    
      if (item) {
        return (
          <View style={{flex:1,backgroundColor:'#dcca87'}}>
            <ScrollView style={{flex: 1, margin: 10}}>
            <View style={{marginTop:50}}>
            <Ionicons 
                style={styles.icon}
                name="fast-food-outline" 
                size={50} 
                color='#493C15'
                  />
              </View>

            <View style={{marginTop:20}}>
            <InputWithLabel
              style ={styles.InputBackground}
              textInputStyle={styles.input}
              textLabelStyle={styles.TextLabel}
              editable={false}
              label="Name:">
              <Text style={styles.Name}>  
             {item.item_name ? item.item_name : 'No information'}
             </Text>
            </InputWithLabel>
            
            <InputWithLabel
              style ={styles.InputBackground}
              textInputStyle={styles.input}
              textLabelStyle={styles.TextLabel}
              editable={false}
              label="Description:">
              <Text style={styles.Name}> 
              {item.item_desc ? item.item_desc : 'No information'}
              </Text>
            </InputWithLabel>
            <InputWithLabel
              style ={styles.InputBackground}
              textInputStyle={styles.input}
              textLabelStyle={styles.TextLabel}
              editable={false}
              label="Price:">
              <Text style={styles.Name}> RM
              {item.item_price ? item.item_price : 'No information'}
              </Text>
            </InputWithLabel>
           

            <View style={{marginTop:30}}>
                  <AppButton title="Add to cart" onPress={addToCart} />
                  <AppButton title="Go Back" onPress={() => navigation.goBack()} />
            </View>
            </View>
              </ScrollView>
              </View>
        );
        
}}



const styles = StyleSheet.create({
  icon:{
    alignSelf:'center',
  },
  InputBackground:{
    backgroundColor:'#ffffc6',
    borderRadius:50,
    width:360,
    alignSelf:'center'},
  
  Name:{
    color:'#493D15',
    fontSize:15,
    fontStyle:'italic',
    marginLeft: 20
    
  },
  container: {
  
    flex: 1,
    bottom:0,
    justifyContent: 'flex-end',//stick to bottom
    alignItems: 'center',
    backgroundColor: '#f7e8a9'
  },
  TextLabel: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      textAlignVertical: 'center',
      
    },
  
    TextInput: {
      position:'absolute',
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
})

export default ViewScreen;