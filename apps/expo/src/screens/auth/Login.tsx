import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../provider/AuthProvider'
import { firebaseClient } from '../../lib/firebase/firebaseClient'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../components/Button'

const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'Password required' }),
})

type LoginInput = z.infer<typeof loginInputSchema>

const LoginScreen = () => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitted, isValid },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginInputSchema),
    })
    console.log(errors)
    const onSubmit = (data: LoginInput) => console.log(data)
    const handleLogin = async (data: LoginInput) => {
        try {
            await firebaseClient
                .auth()
                .signInWithEmailAndPassword(data.email, data.password)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView>
            <View className="h-full">
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View className="flex px-4 gap-4 w-full">
                        <View className="w-full">
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={(value) =>
                                            onChange(value)
                                        }
                                        value={value}
                                        placeholder={'Email'}
                                        className={
                                            'p-4 border-2 rounded-lg border-gray-400 '
                                        }
                                    />
                                )}
                                name="email"
                            />
                        </View>
                        <View>
                            <Text>{errors.email?.message}</Text>
                        </View>
                        <View className="w-full">
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={(value) =>
                                            onChange(value)
                                        }
                                        value={value}
                                        placeholder={'Password'}
                                        className={
                                            'p-4 border-2 rounded-lg border-gray-400 '
                                        }
                                    />
                                )}
                                name="password"
                            />
                        </View>
                        <View>
                            <Text>{errors.password?.message}</Text>
                        </View>
                        <Button
                            borderless
                            onPress={handleSubmit(handleLogin)}
                            title="Log In"
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen
