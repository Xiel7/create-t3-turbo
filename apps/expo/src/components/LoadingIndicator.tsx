import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const LoadingIndicator = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
