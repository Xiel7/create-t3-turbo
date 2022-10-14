import React, { useState } from 'react'
import { View, Text, TextInput, Button, Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../provider/AuthProvider'
import { firebaseClient } from '../../lib/firebase/firebaseClient'
import { Props } from '../../navigation/stacks/MainStack'

const MainScreen = ({ navigation }: Props) => {
    const { user } = useAuth()
    return (
        <SafeAreaView className="bg-blue-400 p-4">
            <View className="flex h-full justify-center items-center bg-blue-400">
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
                >
                    <View className="p-4 bg-slate-500 rounded-lg">
                        <Text>Huh</Text>
                    </View>
                </TouchableOpacity>
                <Text className="font-bold text-2xl text-black">
                    Welcome {user?.email}
                </Text>

                <Button
                    onPress={async () => {
                        try {
                            await firebaseClient.auth().signOut()
                        } catch (error) {}
                    }}
                    title="Sign Out"
                />
            </View>
            <View className="flex w-full justify-center items-center">
                <Text>Footer</Text>
            </View>
        </SafeAreaView>
    )
}

export default MainScreen
