// do not use this in client only in server
import firebaseAdmin from 'firebase-admin'
import { env } from '../../env/server.mjs'

const privateKey = env.FIREBASE_PRIVATE_KEY
const clientEmail = env.FIREBASE_CLIENT_EMAIL
const projectId = env.FIREBASE_PROJECT_ID
const databaseURL = env.FIREBASE_DATABASE_URL

if (!privateKey || !clientEmail || !projectId) {
    console.log(
        `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
    )
}

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: privateKey.replace(/\\n/g, '\n'),
            clientEmail,
            projectId,
        }),
        databaseURL,
    })
}

// const getToken = async (ctx: any) => {
//     const cookies = nookies.get(ctx)
//     if (cookies.token) {
//         const user = await firebaseAdmin.auth().verifyIdToken(cookies.token)
//         return { user }
//     }

//     return null
// }

const verifyToken = async (token: string | null | undefined) => {
    if (token) {
        try {
            const user = await firebaseAdmin.auth().verifyIdToken(token)
            return { user }
        } catch (error) {
            // console.log('VerifyTokenError (Can Ignore)', error)
            return null
        }
    }
    return null
}

export { firebaseAdmin, verifyToken }
