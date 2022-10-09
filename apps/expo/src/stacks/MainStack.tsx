import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../screens/main/Main'
import HomeScreen from '../screens/main/Home'

const Stack = createStackNavigator()

export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={MainScreen} />
                <Stack.Screen name="Main" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
