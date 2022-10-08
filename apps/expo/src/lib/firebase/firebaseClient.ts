// firebaseClient.ts

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
} from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'

if (typeof window !== 'undefined' && !firebase.apps.length) {
    const app = firebase.initializeApp({
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        databaseURL: FIREBASE_DATABASE_URL,
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: FIREBASE_STORAGE_BUCKET,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID,
    })

    initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    })
}

export { firebase as firebaseClient }
