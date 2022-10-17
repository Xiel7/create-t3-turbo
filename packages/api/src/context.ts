// src/server/router/context.ts
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from '@acme/db'
import {
    firebaseAdmin,
    verifyToken,
} from '../../../apps/nextjs/src/lib/firebase/firebaseAdmin'
import { extractToken } from '../../../apps/nextjs/src/utils/helpers'

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = Record<string, never>

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 */
export const createContextInner = async (opts: CreateContextOptions) => {
    return {
        prisma,
    }
}

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
    opts: trpcNext.CreateNextContextOptions
) => {
    const req = opts?.req
    const res = opts?.res

    const token = extractToken(req)
    // console.log('Token', token)
    const session = req && res && (await verifyToken(token))
    // console.log('Session', session)

    return {
        req,
        res,
        session,
        prisma,
        firebaseAdmin,
    }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
