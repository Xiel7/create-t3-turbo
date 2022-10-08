import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { TRPCProvider } from './utils/trpc'

import { HomeScreen } from './screens/home'
import { LoginPage } from './screens/login'
import { AuthProvider } from './components/auth/AuthProvider'

const App = () => {
    return (
        <TRPCProvider>
            <AuthProvider>
                <SafeAreaProvider>
                    <SafeAreaView>
                        <LoginPage />
                        <StatusBar />
                    </SafeAreaView>
                </SafeAreaProvider>
            </AuthProvider>
        </TRPCProvider>
    )
}

registerRootComponent(App)
