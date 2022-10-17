import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../provider/AuthProvider'
import { firebaseClient } from '../../lib/firebase/firebaseClient'
import { MainScreenProps } from '../../navigation/stacks/MainStack'
import { ScreenView } from '../../components/ScreenView'

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
    const { user } = useAuth()
    console.log(user?.photoURL)
    return (
        <ScreenView className="bg-blue-50">
            <View className="flex-1 h-full w-full justify-center items-center gap-4">
                <Text className="font-bold text-2xl text-black">
                    Welcome {user?.email}
                </Text>
                {user?.photoURL ? (
                    <View>
                        <Image
                            source={{ uri: user?.photoURL }}
                            className="rounded-lg w-10 h-10"
                        />
                    </View>
                ) : null}
                <View className="w-full">
                    <Button
                        onPress={() => navigation.navigate('Home')}
                        borderless
                        title={'Go to Home'}
                    />
                </View>
                <View className="w-full">
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
            </View>
            <View className="flex-none justify-center items-center">
                <Text>Made by Eric Ng</Text>
            </View>
        </ScreenView>
    )
}

export default MainScreen
