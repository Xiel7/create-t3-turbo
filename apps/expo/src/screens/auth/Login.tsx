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
import { ScreenView } from '../../components/ScreenView'
import { loginInputSchema } from '../../utils/schema'
import { useLoading } from '../../provider/LoadingProvider'

type LoginInput = z.infer<typeof loginInputSchema>

const LoginScreen = () => {
    const [errorState, setErrorState] = useState('')
    const { passwordVisibility, handlePasswordVisibility, rightIcon } =
        useTogglePasswordVisibility()
    const { loading, setLoading } = useLoading()

    const {
        handleSubmit,
        control,
        formState: { errors, touchedFields },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginInputSchema),
    })

    const handleLogin = (data: LoginInput) => {
        setLoading(true)
        firebaseClient
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(() => setLoading(false))
            .catch((error) => {
                setErrorState('Invalid Credentials. Please Try Again')
                setLoading(false)
            })
    }

    return (
        <ScreenView className="bg-blue-200">
            <KeyboardAwareScrollView className="gap-4" enableOnAndroid={true}>
                {/* Header */}
                <View className="justify-center items-center py-10">
                    <Logo uri={Images.logo} />
                    <Text className="text-3xl text-blue-900 font-extrabold pt-10 leading-normal">
                        Welcome back!
                    </Text>
                </View>
                <View className="">
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                autoCapitalize="none"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                autoFocus={true}
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
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
                <View className="">
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
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
                </View>

                {/* Display Screen Error Mesages */}
                <View className="">
                    {errorState !== '' ? (
                        <FormErrorMessage
                            errorText={errorState}
                            visible={true}
                        />
                    ) : null}
                </View>
                {/* Login button */}
                <View className="">
                    <Button onPress={handleSubmit(handleLogin)}>
                        <View className="py-2 bg-blue-600 rounded-lg">
                            <Text className="text-center font-bold text-lg text-white">
                                Log In
                            </Text>
                        </View>
                    </Button>
                </View>
                {/* Forgot Password */}
                <View className="">
                    <Button
                        borderless
                        onPress={handleSubmit(handleLogin)}
                        title="Forgot Password"
                    />
                </View>
            </KeyboardAwareScrollView>
            <View className="flex-none justify-center items-center">
                <Text className="font-extralight">Made by Eric Ng</Text>
            </View>
        </ScreenView>
    )
}

export default LoginScreen
