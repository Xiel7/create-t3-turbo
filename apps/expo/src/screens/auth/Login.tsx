import React, { useState } from 'react'
import { View, Text } from 'react-native'
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
import { LoginScreenProps } from '../../navigation/types'
import * as Google from 'expo-auth-session/providers/google'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
} from 'firebase/auth/react-native'
import { Icon } from '../../components/Icon'
import { trpc } from '../../utils/trpc'

type LoginInput = z.infer<typeof loginInputSchema>

const GoogleAuthButton = () => {
    const { mutate: googleAuthCreateUser, error: signUpUserError } =
        trpc.user.googleAuthCreateUser.useMutation()
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            '47730022905-ml87tu7qepi7n3j5prkvi9ucqm4ouoa9.apps.googleusercontent.com',
        androidClientId:
            '47730022905-uvr7hfkp7muu82ngggfgu0aitcshk35i.apps.googleusercontent.com',
    })

    React.useEffect(() => {
        console.log(response)
        if (response?.type === 'success') {
            const { id_token } = response.params
            const auth = getAuth()
            const credential = GoogleAuthProvider.credential(id_token)
            signInWithCredential(auth, credential).then((value) => {
                googleAuthCreateUser({
                    email: value.user.email,
                    firebaseId: value.user.uid,
                    image: value.user.photoURL,
                    name: value.user.displayName,
                })
            })
        }
    }, [response])

    return (
        <Button
            disabled={!request}
            onPress={() => {
                promptAsync()
            }}
        >
            <View className="flex flex-row py-2 bg-red-600 rounded-lg justify-center items-center">
                <Icon name="logo-google" size={22} color={'white'} />
                <Text className="ml-2 text-center font-bold text-lg text-white">
                    Continue With Google
                </Text>
            </View>
        </Button>
    )
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
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

    const handleLogin = (values: LoginInput) => {
        const { email, password } = values
        setLoading(true)
        firebaseClient
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => setLoading(false))
            .catch((error) => {
                setErrorState('Invalid Credentials. Please Try Again')
                setLoading(false)
            })
    }

    return (
        <ScreenView className="bg-blue-50">
            <KeyboardAwareScrollView className="gap-4" enableOnAndroid={true}>
                {/* Header */}
                <View className="justify-center items-center py-6">
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
                {errorState !== '' ? (
                    <FormErrorMessage errorText={errorState} visible={true} />
                ) : null}
                {/* Login button */}
                <View className="">
                    <Button onPress={handleSubmit(handleLogin)}>
                        <View className="py-2 bg-blue-600 rounded-lg">
                            <Text className="text-center font-bold text-lg text-white">
                                Sign In
                            </Text>
                        </View>
                    </Button>
                </View>
                <View>
                    <GoogleAuthButton />
                </View>
                {/* Forgot Password */}
                <View className="">
                    <Button
                        borderless
                        onPress={() => navigation.navigate('ForgotPassword')}
                        title="Forgot Password"
                    />
                </View>
                {/* Sign Up*/}
                <View className="">
                    <Button
                        borderless
                        onPress={() => navigation.navigate('SignUp')}
                        title="Don't have an account? Sign Up Now!"
                    />
                </View>
                {/* <View className="">
                    <Button
                        borderless
                        onPress={() => navigation.navigate('GoogleAuth')}
                        title="Test"
                    />
                </View> */}
            </KeyboardAwareScrollView>
            <View className="flex-none justify-center items-center">
                <Text className="font-extralight">Made by Eric Ng</Text>
            </View>
        </ScreenView>
    )
}

export default LoginScreen
