import { NativeStackScreenProps } from '@react-navigation/native-stack'

// export type AuthStackParam = {
//     Login: undefined
//     ForgotPassword: {
//         something: string
//     }
// }

// Auth Stack
export type AuthStackParam = {
    Login: undefined
    ForgotPassword: undefined
    SignUp: undefined
    GoogleAuth: undefined
}

export type LoginScreenProps = NativeStackScreenProps<AuthStackParam, 'Login'>
export type ForgotPasswordScreenProps = NativeStackScreenProps<
    AuthStackParam,
    'ForgotPassword'
>
export type SignUpScreenProps = NativeStackScreenProps<AuthStackParam, 'SignUp'>
export type GoogleAuthScreenProps = NativeStackScreenProps<
    AuthStackParam,
    'GoogleAuth'
>

// Main Stack
export type MainStackParam = {
    Main: undefined
    Home: undefined
}

export type MainScreenProps = NativeStackScreenProps<MainStackParam, 'Main'>
