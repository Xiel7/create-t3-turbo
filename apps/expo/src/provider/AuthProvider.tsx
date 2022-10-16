import firebase from 'firebase/compat/app'
import { createContext, useState, useEffect, useContext } from 'react'
import { Text, View } from 'react-native'
import { firebaseClient } from '../lib/firebase/firebaseClient'

const AuthContext = createContext<{
    user: firebase.User | null
    isFetching: boolean
}>({
    user: null,
    isFetching: true,
})

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<firebase.User | null>(null)
    const [isFetching, setIsFetching] = useState(true)

    // listen for token changes
    // call setUser and write new token as a cookie
    useEffect(() => {
        return firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                setUser(null)
            } else {
                setUser(user)
            }
            setIsFetching(false)
        })
    }, [])

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            const user = firebaseClient.auth().currentUser
            if (user) await user.getIdToken(true)
        }, 10 * 60 * 1000)

        // clean up setInterval
        return () => clearInterval(handle)
    }, [])

    return (
        <AuthContext.Provider value={{ user, isFetching }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
