import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

const Stack = createStackNavigator();

function AuthScreens(){
  return(
    <Stack.Navigator initialRouteName="LogInScreen" >
      <Stack.Screen name ="LogInScreen" component={LogInScreen}/>
      <Stack.Screen name ="SignUpScreen" component={SignUpScreen}/>
    </Stack.Navigator>
  );
}

const App = () =>{

  return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth" 
        screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="Auth" component ={AuthScreens}/>
          <Stack.Screen name="Home" component ={HomeScreen}/>
          <Stack.Screen name= "Cart" component ={CartScreen}/>
        </Stack.Navigator>
    
  </NavigationContainer>
  );
}


export default App;