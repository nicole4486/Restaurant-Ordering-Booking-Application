import React, {useState, useEffect}from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodScreen from './FoodScreen';
import ReservationScreen from './ReservationScreen';
import ProfileScreen from './ProfileScreen';
import AddFeedbackScreen from './AddFeedbackScreen';
import ViewFeedbackScreen from './ViewFeedbackScreen';
import AboutScreen from './AboutScreen';
import ViewScreen from './ViewScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MyDrawerComponent = (props: any) => {
  const { navigation } = props;
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



const logout = async () => {
    try {
      await AsyncStorage.removeItem('UserData');
      navigation.navigate('Auth');
    } catch (error) {
      console.log(error);
    }
}
  
  return (
<View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#f7e8a9',flexGrow:3 }}>
        <View style={{ padding:30,flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Anta-Regular',
              fontSize: 30,
              fontWeight: 'bold',
              marginRight: 10, // Add margin right for spacing
              fontStyle:'italic'
            }}
          >
            Welcome To
          </Text>
          <Image
            style={{
              width: 64,
              height: 64,
            }}
            source={require('./../assets/logo.jpg')}
          />
        </View>
        <View style={{backgroundColor: '#FFFFF4', flex: 1, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding:15}}>
      
      
     <View style={{alignSelf:'flex-end',height:150,width:290,marginBottom:0,borderTopWidth:0}} >
      <TouchableOpacity style={{}}>
          <View style={{flexDirection: 'row', alignItems: 'center',backgroundColor:'#f7e8a9',height:55,width:305}}>
            <Ionicons style={{marginLeft:40}} name="settings-outline" size={20} color='black' />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 15,
                fontFamily: 'Anta-Regular',
                color: 'black',
                alignSelf:'center'
              }}
            >
              Settings
            </Text>
          </View>
        </TouchableOpacity>
      
    
        
        <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
          <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:'#dcca87',height:55,width:305 }}>
            <Ionicons style={{marginLeft:40}} name="cart-outline" size={20} color='black' />
            <Text style={{
              marginLeft: 20,
              fontSize: 15,
              fontFamily: 'Anta-Regular',
              color: 'black',
              alignSelf:'center'
            }}
            >Cart</Text>
            
          </View>
        </TouchableOpacity>
      

        
        

        <TouchableOpacity onPress={logout} style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:'#cab26a',height:55,width:305}}>
            <Ionicons style={{marginLeft:40}} name="exit-outline" size={20} color='black'  />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 15,
                fontFamily: 'Anta-Regular',
                color:'black',
                alignSelf:'center'
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const DrawerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FoodScreen">
      <Stack.Screen name="Food" component={FoodScreen} />
      <Stack.Screen name="View" component={ViewScreen} />
    </Stack.Navigator>
  );
};

const HomeScreen = () => {
  
  
  return (
    
      <Drawer.Navigator
        drawerContent={props => <MyDrawerComponent {...props} />}
        screenOptions={{
          drawerActiveTintColor: '#ff7f50',
          drawerActiveBackgroundColor: '#fafad2',
          drawerLabelStyle: {
            marginLeft: -24,
            fontFamily: 'Anta-Regular',
          },
        }}
      >

        <Drawer.Screen
          name="Meal Set" //as shown
          component={DrawerStack}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="fast-food-outline" size={20} color={color} />
            ),
          }}
        />
     

      <Drawer.Screen
         name ="Reservation"
         component={ReservationScreen}
         options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={20} color={color} />
          ),
         }}
         />
      
      <Drawer.Screen
         name ="Profile"
         component={ProfileScreen}
         options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={20} color={color} />
          ),
         }}
         />
      <Drawer.Screen
         name ="AddFeedback"
         component={AddFeedbackScreen}
         options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="mail-outline" size={20} color={color} />
          ),
         }}
         />

      <Drawer.Screen
         name ="ViewFeedback"
         component={ViewFeedbackScreen}
         options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="mail-open-outline" size={20} color={color} />
          ),
         }}
         />    
      <Drawer.Screen
         name ="About"
         component={AboutScreen}
         options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="bulb-outline" size={20} color={color} />
          ),
         }}
         />         
    </Drawer.Navigator>
    
  );
}

export default HomeScreen;