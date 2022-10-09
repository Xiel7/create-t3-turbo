import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/auth/Login'
import LogoutScreen from '../screens/auth/Logout'

const Stack = createStackNavigator()

export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Sign Up" component={LogoutScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}