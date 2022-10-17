import React from 'react'
import { z } from 'zod'
import { Button } from '../../components/Button'
import { ScreenView } from '../../components/ScreenView'
import { loginInputSchema } from '../../utils/schema'
import { GoogleAuthScreenProps } from '../../navigation/types'
import * as Google from 'expo-auth-session/providers/google'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
} from 'firebase/auth/react-native'

type LoginInput = z.infer<typeof loginInputSchema>

const GoogleAuthScreen: React.FC<GoogleAuthScreenProps> = ({ navigation }) => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            '47730022905-ml87tu7qepi7n3j5prkvi9ucqm4ouoa9.apps.googleusercontent.com',
        clientSecret: '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',
    })

    React.useEffect(() => {
        console.log(response)
        if (response?.type === 'success') {
            const { id_token } = response.params
            const auth = getAuth()
            const credential = GoogleAuthProvider.credential(id_token)
            signInWithCredential(auth, credential)
        }
    }, [response])

    return (
        <ScreenView>
            <Button
                borderless
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync()
                }}
            />
        </ScreenView>
    )
}

export default GoogleAuthScreen
