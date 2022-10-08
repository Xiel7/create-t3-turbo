// firebaseClient.ts

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { clientEnv } from '../../env/schema.mjs'

if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp({
        apiKey: clientEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: clientEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: clientEnv.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        projectId: clientEnv.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        storageBucket: clientEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: clientEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: clientEnv.NEXT_PUBLIC_FIREBASE_APP_ID,
    })
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export { firebase as firebaseClient }
