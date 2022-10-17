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
import { signUpSchema } from '../../utils/schema'
import { useLoading } from '../../provider/LoadingProvider'
import { SignUpScreenProps } from '../../navigation/types'
import { useToast } from 'native-base'
import { trpc } from '../../utils/trpc'

type SignUpInput = z.infer<typeof signUpSchema>

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
    const [errorState, setErrorState] = useState('')
    const { passwordVisibility, handlePasswordVisibility, rightIcon } =
        useTogglePasswordVisibility()
    const { loading, setLoading } = useLoading()
    const toast = useToast()
    const { mutateAsync: signUpUser, error: signUpUserError } =
        trpc.user.signUp.useMutation()

    const {
        handleSubmit,
        control,
        formState: { errors, touchedFields },
    } = useForm<SignUpInput>({
        resolver: zodResolver(signUpSchema),
    })

    const handleSignup = async (values: SignUpInput) => {
        const { email, password } = values
        try {
            await signUpUser({ email, password })
            toast.show({
                description: 'Success: Sign Up Successful.',
            })
            navigation.navigate('Login')
        } catch (error) {
            setErrorState(
                signUpUserError?.message ? signUpUserError?.message : ''
            )
        }
    }

    return (
        <ScreenView className="bg-blue-50">
            <KeyboardAwareScrollView className="gap-4" enableOnAndroid={true}>
                {/* Header */}
                <View>
                    <Text className="text-3xl text-blue-900 font-extrabold leading-normal">
                        Sign Up
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
                    <Button onPress={handleSubmit(handleSignup)}>
                        <View className="py-2 bg-blue-600 rounded-lg">
                            <Text className="text-center font-bold text-lg text-white">
                                Sign Up
                            </Text>
                        </View>
                    </Button>
                </View>
                {/* Forgot Password */}
                <View className="">
                    <Button
                        borderless
                        onPress={() => navigation.navigate('Login')}
                        title="Already have an account?"
                    />
                </View>
            </KeyboardAwareScrollView>
            <View className="flex-none justify-center items-center">
                <Text className="font-extralight">Made by Eric Ng</Text>
            </View>
        </ScreenView>
    )
}

export default SignUpScreen
