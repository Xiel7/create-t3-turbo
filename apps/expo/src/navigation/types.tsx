import { NativeStackScreenProps } from '@react-navigation/native-stack'

// Auth Stack
// export type AuthStackParam = {
//     Login: undefined
//     ForgotPassword: {
//         something: string
//     }
// }

export type AuthStackParam = {
    Login: undefined
    ForgotPassword: undefined
}

export type LoginScreenProps = NativeStackScreenProps<AuthStackParam, 'Login'>
export type ForgotPasswordScreenProps = NativeStackScreenProps<
    AuthStackParam,
    'ForgotPassword'
>

// Main Stack
export type MainStackParam = {
    Main: undefined
    Home: undefined
}

export type MainScreenProps = NativeStackScreenProps<MainStackParam, 'Main'>
