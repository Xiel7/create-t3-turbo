import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../provider/AuthProvider'
import { firebaseClient } from '../../lib/firebase/firebaseClient'
import { Props } from '../../navigation/stacks/MainStack'

const MainScreen = ({ navigation }: Props) => {
    const { user } = useAuth()
    return (
        <SafeAreaView className="bg-blue-400">
            <View className="flex-1 h-full justify-center items-center bg-blue-400">
                <Button
                    onPress={() => navigation.navigate('Home')}
                    borderless
                    title={'Go to Home'}
                />

                <Text className="font-bold text-2xl text-black">
                    Welcome {user?.email}
                </Text>
                <Button
                    onPress={async () => {
                        try {
                            await firebaseClient.auth().signOut()
                        } catch (error) {}
                    }}
                    borderless
                    title={'Sign Out'}
                />
            </View>
            <View className="flex-1 w-full justify-center items-center">
                <Text>Made by zakotopro</Text>
            </View>
        </SafeAreaView>
    )
}

export default MainScreen
