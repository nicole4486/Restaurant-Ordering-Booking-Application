import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppButton, InputWithLabel } from "../components/style";
let config = require('../Config');

const ReservationScreen = ({ navigation }: any) => {

  const [username, setUsername] = useState('');
  const [booking, setBooking] = useState<any>();

  useEffect(() => {
    syncUser();

  }, []);

  const syncUser = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null) {
        let user = JSON.parse(value);
        setUsername(user.Username);
        _getItem(user.Username);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const _getItem = async (username: string) => {
    let url = config.settings.serverPath + '/api/bookings/' + username;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data. Server responded with status ' + response.status);
      }
      const bookingData = await response.json();
      setBooking(bookingData);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f7e8a9' }}>
      <ScrollView style={{ flex: 1, margin: 10 }}>
        <View style={{ marginTop: 50 }}>
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={50}
            color='#493C15'
          />
        </View>
        <InputWithLabel
          style={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          label="Username">
          <Text style={styles.Name}>
            {username ? username : 'No information'}
          </Text>
        </InputWithLabel>
        <InputWithLabel
          style={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          label="Booking ID">
          <Text style={styles.Name}>
            {booking ? booking.booking_id : 'No information'}
          </Text>
        </InputWithLabel>
        <InputWithLabel
          style={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          label="Order ID">
          <Text style={styles.Name}>
            {booking ? booking.order_id : 'No information'}
          </Text>
        </InputWithLabel>
        <InputWithLabel
          style={styles.InputBackground}
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          label="Booking Date">
          <Text style={styles.Name}>
            {booking ? new Date(booking.booking_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : 'No information'}
          </Text>

        </InputWithLabel>
        <View style={{ marginTop: 30 }}>
          <AppButton title="Go Back" onPress={() => navigation.goBack()}/>
        </View>
      </ScrollView>
    </View>
  );
}


const inputStyles = StyleSheet.create({
  container: {
    height: 100,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    textAlignVertical: 'center',
  },


  input: {
    flex: 3,
    fontSize: 20,
    color: 'black',
    marginLeft: 20
  },
});

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
  InputBackground: {
    backgroundColor: '#ffffc6',
    borderRadius: 50,
    width: 360,
    alignSelf: 'center'
  },

  Name: {
    color: '#493D15',
    fontSize: 15,
    fontStyle: 'italic',
    marginLeft: 20

  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,


  },
  label: {
    fontWeight: 'bold',
    color: 'darkblue',
    fontSize: 15,
  },

})



export default ReservationScreen;