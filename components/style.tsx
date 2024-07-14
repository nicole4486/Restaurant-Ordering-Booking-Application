import React from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';


/**
 * InputWithLabel
 */
export const InputWithLabel = ( props: any ) => {

    const orientationDirection = (props.orientation == 'horizontal') ? 'row': 'column';
  
    return (
      <View style={[inputStyles.container, {flexDirection: orientationDirection}]}>
        <Text style={inputStyles.label}>{props.label}</Text>
        <TextInput
          style={[inputStyles.input, props.style]}
          {...props}
        />
      </View>
    );
  }


/**
 * AppButton
 */
export const AppButton = ( props: any ) => {

    const orientationDirection = (props.orientation == 'horizontal') ? 'row': 'column';

    return (
        <TouchableNativeFeedback
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        >
            <View style={[buttonStyles.buttonChange, {backgroundColor: '#af974d'},{flexDirection: orientationDirection}]}>
                <Text style={buttonStyles.buttonText}>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}


const buttonStyles = StyleSheet.create({
    button: {
      borderRadius :50,
      margin: 20,
      alignItems: 'center',
    },
    buttonChange: {
      borderRadius :50,
      margin: 10,
      alignSelf: 'center',
      height:70,
      width: 200
    },
    buttonText: {
      padding: 20,
      fontSize: 20,
      color: 'white',
      alignSelf:'center'
    },
  });

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
    
  
    input:{
        color:'#493D15',
        fontSize:15,
        fontStyle:'normal',
        marginLeft: 20
        
      }
  });
