import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './src/components/Home';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import ApiList from './src/components/ApiList';

const Tab = createStackNavigator()
const App = () => {
  return (

    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Login' component={Login} />
        <Tab.Screen name='ApiList' component={ApiList}   options={{ title: 'TODO list' }} />
        <Tab.Screen name='Signup' component={Signup} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
