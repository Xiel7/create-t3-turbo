// src/server/router/index.ts
import { t } from '../trpc'
import { exampleRouter } from './example'

import { postRouter } from './post'

export const appRouter = t.router({
    post: postRouter,
    example: exampleRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
