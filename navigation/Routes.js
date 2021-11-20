import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

// import screens
import HomeScreen from './../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  let routeName = 'Home';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRoute={routeName}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
