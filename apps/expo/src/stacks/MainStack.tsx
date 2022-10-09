import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Main from '../screens/Main'

const Stack = createStackNavigator()

export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
