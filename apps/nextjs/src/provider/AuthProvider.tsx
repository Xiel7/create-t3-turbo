import firebase from 'firebase/compat/app'
import nookies from 'nookies'
import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from 'react'
import { firebaseClient } from '../lib/firebase/firebaseClient'

const AuthContext = createContext<{ user: firebase.User | null }>({
    user: null,
})

type Props = {
    children: ReactNode
}

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<firebase.User | null>(null)

    // listen for token changes
    // call setUser and write new token as a cookie
    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null)
                nookies.set(undefined, 'token', '', { path: '/' })
            } else {
                const token = await user.getIdToken()
                setUser(user)
                nookies.set(undefined, 'token', token, { path: '/' })
            }
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
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
