import React from "react";
import {View,Text, StyleSheet, Linking} from "react-native";
import { AppButton} from "../components/style";
import {createMapLink} from 'react-native-open-maps';
import Ionicons from "react-native-vector-icons/Ionicons";



const AboutScreen = () => {


    const queryLocation = () => { 
        const mapLink = createMapLink({ provider: 'google', query: 'UTAR SUNGAI LONG'});
        Linking.openURL(mapLink);
      }

    return (
        <View style={styles.container}>
            <View style={{marginTop:40,paddingBottom:0}}>
              <Ionicons 
                style={styles.icon}
                name="bulb-outline" 
                size={50} 
                color='#493C15'
                  />
                </View>
            <Text style={styles.TextTitle}>Who are we?</Text>
            <View style={styles.textbox}>
                <Text style= {styles.text}>
                    Welcome to WCD, where global flavors meet culinary passion! Our restaurant in UTAR invites you to savor a world of taste sensations.
                    With a commitment to quality, sustainability, and community, we're more than just a dining destination - we're a place where memories 
                    are made and flavors are celebrated. Join us at WCD and experience the joy of food, culture, and connection.            
                </Text>
            </View>
            <AppButton 
                onPress={queryLocation}
                title='Open Map' 
            />
        </View>
    )
}
const styles = StyleSheet.create({
    icon:{
        alignSelf:'center',
      },
    textbox:{
        marginTop:25,
        margin:5,
        borderRadius:50,
        borderWidth:0,
        padding:10,
        backgroundColor:'#ffffc6',
        width:360,
        height:370,
        alignSelf:'center'
    },
    container: {
      flex: 1,
      bottom:0,
      backgroundColor: '#f7e8a9',
    },
    text:{
        fontSize : 20,
        marginBottom :5,
        padding:10,
        borderRadius:20,
        color:'#61552D',
        textAlign:'center',
        margin:13
      },
      TextTitle:{
        fontSize: 20,
        marginTop:30,
        fontWeight: 'bold',
        marginLeft: 3,
        textAlignVertical: 'center',
        alignSelf:'center'
      },
      
})


export default AboutScreen