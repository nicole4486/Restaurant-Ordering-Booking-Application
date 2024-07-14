import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableNativeFeedback, FlatList} from "react-native";
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
let config = require('../Config');

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const FoodScreen = ({ navigation}: any) => {
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

  //const { id } = route.params;
  const[items,setItems] = useState([]);
  const[isFetching,setIsFetching] = useState(false);


  const _load = () => {
    let url = config.settings.serverPath + '/api/items';
    setIsFetching(true);

    fetch(url)
        .then(response => {
            console.log(response);
            if (!response.ok) {
            Alert.alert('Error:', response.status.toString());
            throw Error('Error ' + response.status);
            }
            setIsFetching(false);
            return response.json();
        })
        .then(items => {
            setItems(items);
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(()=>{
        _load();
    },[]);


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dcca87' }}>
      <Text style={styles.TextTitleMealSet}>Dear customer, please choose only one meal set.</Text>
      <View style={{}}>
            <Ionicons 
                style={styles.icon}
                name="pizza-outline" 
                size={50} 
                color='#493C15'
                  />
                  </View>
        <FlatList
          refreshing={isFetching}
          onRefresh={_load}
          data={items}
          renderItem={({item}:any) => {
            return (
              <TouchableNativeFeedback
               onPress={() => {
                navigation.navigate('View', {
                id: item.item_id,
                username:username,
                _refresh: _load,
                })
                
                }}
              >
                <View style={styles.planList}>
                  <Image source={{uri: item.item_photo}} style={{width: 200, height: 200,alignSelf:'center',borderRadius:30,marginTop:15}} />
                  <View style={{margin:5,padding:5}}>
                  <Text style={styles.Text}>
                    {item.item_name}
                  </Text>
                  <Text style={styles.Textinfo}>{item.item_desc}</Text>
                  <Text style={styles.TextPrice}>RM{item.item_price}</Text>
                  </View>
            </View>
              </TouchableNativeFeedback>
            );
          }}>
          </FlatList>

          </View>
         
          )}





const styles = StyleSheet.create({
  icon:{
    alignSelf:'center',
    margin:15

  },
  container: {
    paddingHorizontal: 20,
  },
  TextTitle: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
  },
  TextTitleMealSet: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: '#524721',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
    marginTop:20
  },
  TextUser: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: '#61552D',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,

  },
  TextTitleWindow: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  planList: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 15,
    borderColor: '#FFFFED',
    backgroundColor:'#ffffc6',
    height:390
  },
  mealItemContainer: {
    flex:1, 
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor:'#fffacb',
    width:400,
    height:350
  },
  Text: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: '#494921',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding:10
    
  },
  Textinfo: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: '#4F4F36',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 12,
    padding:10
  },
  TextPrice: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: '#3C3C18',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  Image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#f7e8a9'
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor:'white'

  },
  // mealItemContainer: {
  //   marginBottom: 20,
  // },
  picker: {
    backgroundColor :'white',
    width: 200,
    marginBottom: 20,
  },
  InputBackground:{
    backgroundColor:'#ffffc6',
    borderRadius:70,
    width:350,
    margin:10
  }
  ,
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
  datePicker: {
    width: 200,
    height:40,
    borderRadius:50,
    marginVertical: 10,
    backgroundColor:'#fffbe7',
    textAlign:'center',
    fontSize:15
  },
});


export default FoodScreen;