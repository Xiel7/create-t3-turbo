import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { TRPCProvider } from './utils/trpc'

import { AuthProvider } from './provider/AuthProvider'
import RootNavigator from './navigation/RootNavigator'
import { LoadingProvider } from './provider/LoadingProvider'

const App = () => {
    return (
        <AuthProvider>
            <TRPCProvider>
                <LoadingProvider>
                    <SafeAreaProvider>
                        <StatusBar />
                        <RootNavigator />
                    </SafeAreaProvider>
                </LoadingProvider>
            </TRPCProvider>
        </AuthProvider>
    )
}

registerRootComponent(App)
