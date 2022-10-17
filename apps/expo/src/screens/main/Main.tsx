import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../provider/AuthProvider'
import { firebaseClient } from '../../lib/firebase/firebaseClient'
import { MainScreenProps } from '../../navigation/stacks/MainStack'
import { ScreenView } from '../../components/ScreenView'

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
    const { user } = useAuth()
    return (
        <ScreenView className="bg-blue-50">
            <View className="flex-1 h-full justify-center items-center ">
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
            <View className="flex-none justify-center items-center">
                <Text>Made by Eric Ng</Text>
            </View>
        </ScreenView>
    )
}

export default MainScreen
