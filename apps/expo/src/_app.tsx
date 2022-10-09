import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { TRPCProvider } from './utils/trpc'

import { AuthProvider } from './components/auth/AuthProvider'
import RootNavigation from './navigation/RootNavigation'
import { HomeScreen } from './screens/home'

const App = () => {
    return (
        <AuthProvider>
            <TRPCProvider>
                <SafeAreaProvider>
                    <StatusBar />
                    <HomeScreen />
                </SafeAreaProvider>
            </TRPCProvider>
        </AuthProvider>
    )
}

registerRootComponent(App)
