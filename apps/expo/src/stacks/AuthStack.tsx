import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/auth/Login'
import Logout from '../screens/auth/Logout'

const Stack = createStackNavigator()

export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Sign Up" component={Logout} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
