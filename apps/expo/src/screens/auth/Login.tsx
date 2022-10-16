import React, { useState } from 'react'
import { View, Text, TextInput as RNTextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../provider/AuthProvider'
import { firebaseClient } from '../../lib/firebase/firebaseClient'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import { useTogglePasswordVisibility } from '../../hooks'
import FormErrorMessage from '../../components/FormErrorMessage'
import { Logo } from '../../components/Logo'
import { Images } from '../../config/images'

const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'Password required' }),
})

type LoginInput = z.infer<typeof loginInputSchema>

const LoginScreen = () => {
    const [errorState, setErrorState] = useState('')
    const { passwordVisibility, handlePasswordVisibility, rightIcon } =
        useTogglePasswordVisibility()
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, touchedFields },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginInputSchema),
    })
    const handleLogin = (data: LoginInput) => {
        firebaseClient
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .catch((error) => setErrorState(error.message))
    }

    return (
        <SafeAreaView>
            <View className="h-full">
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View className="flex px-4 gap-4 w-full">
                        <View className="w-full">
                            <View className="justify-center items-center m-10">
                                <Logo uri={Images.logo} />
                                <Text className="text-2xl font-semibold pt-10 leading-normal">
                                    Welcome back!
                                </Text>
                            </View>
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
                                        leftIconName="mail"
                                    />
                                )}
                                name="email"
                            />
                            <FormErrorMessage
                                errorText={errors.email?.message}
                                visible={touchedFields.email}
                            />
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
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        secureTextEntry={passwordVisibility}
                                        textContentType="password"
                                        rightIcon={rightIcon!}
                                        handleToggle={handlePasswordVisibility}
                                        placeholder={'Password'}
                                        leftIconName="ios-key-outline"
                                    />
                                )}
                                name="password"
                            />
                            <FormErrorMessage
                                errorText={errors.password?.message}
                                visible={touchedFields.password}
                            />
                            {/* Display Screen Error Mesages */}
                            {errorState !== '' ? (
                                <FormErrorMessage
                                    errorText={errorState}
                                    visible={true}
                                />
                            ) : null}
                        </View>

                        {/* Login button */}
                        <View className="w-full p-4">
                            <Button
                                borderless
                                onPress={handleSubmit(handleLogin)}
                                title="Log In"
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen
