import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { useAuth } from '../../components/auth/AuthProvider'
import { firebaseClient } from '../../lib/firebase/firebaseClient'

const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const { user } = useAuth()

    return (
        <View className="h-full w-full p-4 flex gap-2">
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={'Email'}
                keyboardType={'email-address'}
                className={'w-full p-4 border-2 rounded-lg border-gray-400'}
            />
            <TextInput
                value={pass}
                onChangeText={setPass}
                placeholder={'Password'}
                keyboardType={'visible-password'}
                className={'w-full p-4 border-2 rounded-lg border-gray-400'}
            />
            <Button
                onPress={async () => {
                    await firebaseClient
                        .auth()
                        .createUserWithEmailAndPassword(email, pass)
                }}
                title="Create User"
            />
            <Button
                onPress={async () => {
                    try {
                        await firebaseClient
                            .auth()
                            .signInWithEmailAndPassword(email, pass)
                    } catch (error) {}
                }}
                title="Sign In"
            />
        </View>
    )
}

export default Login
