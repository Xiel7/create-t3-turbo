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
            .catch((error) =>
                setErrorState('Invalid Credentials. Please Try Again')
            )
    }

    return (
        <ScreenView className="bg-blue-200">
            <KeyboardAwareScrollView className="gap-4" enableOnAndroid={true}>
                {/* Header */}
                <View className="justify-center items-center py-10">
                    <Logo uri={Images.logo} />
                    <Text className="text-2xl font-semibold pt-10 leading-normal">
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
                    <Button
                        borderless
                        onPress={handleSubmit(handleLogin)}
                        title="Log In"
                    />
                </View>
            </KeyboardAwareScrollView>
            <View className="flex-none w-full justify-center items-center">
                <Text>Made by Eric Ng</Text>
            </View>
        </ScreenView>
    )
}

export default LoginScreen
