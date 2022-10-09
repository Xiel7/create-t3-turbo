import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { useAuth } from '../components/auth/AuthProvider'
import { firebaseClient } from '../lib/firebase/firebaseClient'

const Main = () => {
    const { user } = useAuth()
    return (
        <View className="flex h-full justify-center items-center">
            <Text className="font-bold text-2xl text-black">
                Welcome {user?.email}
            </Text>

            <Button
                onPress={async () => {
                    try {
                        await firebaseClient.auth().signOut()
                        console.log('YAY')
                    } catch (error) {}
                }}
                title="Sign Out"
            />
        </View>
    )
}

export default Main
