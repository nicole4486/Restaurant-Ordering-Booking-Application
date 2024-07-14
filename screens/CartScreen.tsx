import React, { useEffect, useState } from "react";
import { Alert, ScrollView, TextInput, TouchableNativeFeedback } from "react-native";
import {Text,View,Pressable} from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppButton, InputWithLabel } from "../components/style";

let config = require('../Config');

const CartScreen = ({navigation}: any ) => {

  const [order,setOrder] = useState<any>();
  const [username, setUsername] = useState('');
  const [item,setItem] = useState<any>();
  const [selectedDate, setSelectedDate] = useState(new Date());   // State to store the selected item
  const [showDatePicker, setShowDatePicker] = useState(false);   // State to store the selected item

  useEffect(() => {
    // console.log(username);
    syncUser();
    // _loadByID();
}, []);


  useEffect(() => {
 
    if (order) {
      _getItem(); // Call _getItem only when order changes
    }
  
  }, [order]);

  const syncUser = async () => {
    try {
        await AsyncStorage.getItem('UserData')
        .then(value => {
            if (value != null) {
                let user = JSON.parse(value);
                setUsername(user.Username);
                _loadByID(user.Username);
            }
        })
} catch (error) {
    console.log(error);
        }
}

const _loadByID = (username:string) => {
  let url = config.settings.serverPath + '/api/orders/'+ username; 
  console.log(url);
  fetch(url)
    .then(response => {
      if (!response.ok) {
        Alert.alert('Error:', response.status.toString());
        throw Error('Error ' + response.status);
      }
      return response.json();
    })
    .then(item => {
      setOrder(item);
      //console.log(item);
    })
    .catch(error => {
      console.error(error);
    });
}





const _getItem = async () => {
  try {
    if (!order) {
      // If order or order.item_id is not available, handle the error or do nothing
      console.log("Order or item ID is not available.");
      return;
    }
    let url = config.settings.serverPath + '/api/items/' + order.item_id;
    const response = await fetch(url);
    if (!response.ok) {
      Alert.alert('Error:', response.status.toString());
      throw Error('Error ' + response.status);
    }
    const item = await response.json();
    setItem(item);
    //console.log(item);
    navigation.setOptions({ headerTitle: item.name });
  } catch (error) {
    console.error(error);
  }
}

const onDateClick = () => {
  setShowDatePicker((prev) => !prev); // Toggle the showDatePicker state
};

const confirmOrder = ()=>{

  let url = config.settings.serverPath + '/api/bookings';
      fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
    
          body: JSON.stringify({
            username: username,
            order_id: order.order_id,
            booking_date: selectedDate,
            
          }),
        }).then((response) => {
          if (!response.ok) {
            Alert.alert('Error', response.status.toString());
            throw Error('Error: ' + response.status);
          }
          navigation.goBack();
          return response.json()
        }).catch((error) => {
            console.error(error);
          });

}


 if (order) {
    return (
      <View style={{flex:1,backgroundColor:'#f7e8a9'}}>
        <ScrollView style={{flex: 1, margin: 10}}>
        <View style={{marginTop:50}}>
        <Ionicons 
                style={styles.icon}
                name="fast-food-outline" 
                size={50} 
                color='#493C15'
                  />
        <View style={{marginTop:20}}>
        <InputWithLabel
          style ={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.TextLabel}
          editable={false}
          label="Order ID:">
         <Text style={styles.Name}> 
          {order.order_id ? order.order_id : 'No information'}
          </Text>
         
        </InputWithLabel>
        <InputWithLabel
          style ={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          label="Item ID:">
          <Text style={styles.Name}> 
          {order.item_id ? order.item_id : 'No information'}
          </Text>
        </InputWithLabel>
        <InputWithLabel
          style ={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          label="Item Name:">
          <Text style={styles.Name}> 
          {item ? item.item_name : 'No information'}
          </Text>
        </InputWithLabel>
        <InputWithLabel
          style ={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          label="Username:">
          <Text style={styles.Name}> 
          {order.username ? order.username : 'No information'}
          </Text>
        </InputWithLabel>
        <View style={{marginTop:15}}>
        <Text style={styles.label}>Select Date:</Text>
        <Pressable onPress={onDateClick}>
                <View style={styles.datePicker}>
                  <Text style={styles.datePickerText}>Click here to select date</Text>
                </View>
                  
                </Pressable>
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode={'date'}
                    display="spinner"
                    is24Hour={false}
                    onChange={(event, date) => {
                      setShowDatePicker(false);
                      setSelectedDate(date || selectedDate);
                    }}
                    style={styles.datePicker}
                  />
                  )}
        </View>
        <InputWithLabel
          style ={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
           label="Confirmed Reservation Date:">
          <Text style={styles.Name}> 
          {selectedDate ? selectedDate.toLocaleDateString() : 'No information'}
          </Text>
        </InputWithLabel>
          <View style={{marginTop :30}}>
              <AppButton title="Confirm Order" onPress={confirmOrder} />
              <AppButton title="Go Back" onPress={() => navigation.goBack()} />
              </View>
        </View>
       </View>
          </ScrollView>
          </View>
    );
}
}


const styles = StyleSheet.create({
  label: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        textAlignVertical: 'center',
      },
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
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    },
  datePicker: {
    height:50,
    marginVertical: 10,
    textAlign:'center',
    fontSize:20,
    backgroundColor:'white',
    borderRadius:50,
    width:360,
    alignSelf:'center',
  },
  datePickerText:{
    fontSize:17,
    textAlign:'center',
    marginTop:13
  }
})


export default CartScreen;