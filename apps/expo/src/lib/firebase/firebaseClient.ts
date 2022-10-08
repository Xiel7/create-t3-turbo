// firebaseClient.ts

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import env from '@env'

if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp({
        apiKey: env.FIREBASE_API_KEY,
        authDomain: env.FIREBASE_AUTH_DOMAIN,
        databaseURL: env.FIREBASE_DATABASE_URL,
        projectId: env.FIREBASE_DATABASE_URL,
        storageBucket: env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
        appId: env.FIREBASE_APP_ID,
    })
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export { firebase as firebaseClient }
