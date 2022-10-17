// src/server/router/index.ts
import { t } from '../trpc'
import { exampleRouter } from './example'

import { postRouter } from './post'
import { userRouter } from './user'

export const appRouter = t.router({
    post: postRouter,
    example: exampleRouter,
    user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
