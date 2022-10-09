// src/utils/trpc.ts
import { createTRPCNext } from '@trpc/next'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@acme/api'
import { transformer } from '@acme/api/transformer'
import { firebaseClient } from '../lib/firebase/firebaseClient'

const getBaseUrl = () => {
    if (typeof window !== 'undefined') return '' // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

    return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export const trpc = createTRPCNext<AppRouter>({
    config() {
        return {
            transformer,
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                    async headers() {
                        // get the token from firebase client and attach it to authorization header
                        return {
                            Authorization:
                                'Bearer ' +
                                (await firebaseClient
                                    .auth()
                                    .currentUser?.getIdToken()),
                        }
                    },
                }),
            ],
        }
    },
    ssr: false,
})
