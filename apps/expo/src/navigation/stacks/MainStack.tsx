import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import MainScreen from '../../screens/main/Main'
import HomeScreen from '../../screens/main/Home'

export const defaultScreenOption: StackNavigationOptions = {
    headerShown: false,
}

type MainStackParamList = {
    Main: undefined
    Home: undefined
}

export type Props = NativeStackScreenProps<MainStackParamList, 'Main'>

const Stack = createStackNavigator<MainStackParamList>()

export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={defaultScreenOption}>
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
