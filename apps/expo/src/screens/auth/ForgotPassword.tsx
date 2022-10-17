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
import { useToast } from 'native-base'
import { ScreenView } from '../../components/ScreenView'
import { forgotPasswordSchema, loginInputSchema } from '../../utils/schema'
import { useLoading } from '../../provider/LoadingProvider'
import { ForgotPasswordScreenProps } from '../../navigation/types'

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
    navigation,
}) => {
    const [errorState, setErrorState] = useState('')
    const toast = useToast()
    const { passwordVisibility, handlePasswordVisibility, rightIcon } =
        useTogglePasswordVisibility()
    const { loading, setLoading } = useLoading()

    const {
        handleSubmit,
        control,
        formState: { errors, touchedFields },
    } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const handleSendPasswordResetEmail = (values: ForgotPasswordInput) => {
        const { email } = values

        firebaseClient
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                toast.show({ description: 'Success: Password Reset Email sent.'})
                navigation.navigate('Login')
            })
            .catch((error) => setErrorState(error.message))
    }

    return (
        <ScreenView className="bg-blue-50">
            <KeyboardAwareScrollView className="gap-4" enableOnAndroid={true}>
                {/* Header */}
                <View>
                    <Text className="text-3xl text-blue-900 font-extrabold leading-normal">
                        Reset Your Password
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
                                placeholder={'Enter Your Email'}
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
                        onPress={handleSubmit(handleSendPasswordResetEmail)}
                    >
                        <View className="py-2 bg-blue-600 rounded-lg">
                            <Text className="text-center font-bold text-lg text-white">
                                Send Reset Email
                            </Text>
                        </View>
                    </Button>
                </View>
                {/* Forgot Password */}
                <View className="">
                    <Button
                        borderless
                        onPress={() => navigation.navigate('Login')}
                        title="Go Back to Login"
                    />
                </View>
            </KeyboardAwareScrollView>
            <View className="flex-none justify-center items-center">
                <Text className="font-extralight">Made by Eric Ng</Text>
            </View>
        </ScreenView>
    )
}

export default ForgotPasswordScreen
