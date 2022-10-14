// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'
import { AuthProvider } from '../provider/AuthProvider'

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default trpc.withTRPC(MyApp)
