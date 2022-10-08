import { t } from '../trpc'
import { z } from 'zod'
import { protectedProcedure } from '../procedure/protectedProcedure'

export const exampleRouter = t.router({
    all: protectedProcedure.query(({ ctx }) => {
        return {
            text: 'hello',
        }
    }),
    test: protectedProcedure.query(({ ctx }) => {
        return {
            text: ctx.session,
        }
    }),
})
