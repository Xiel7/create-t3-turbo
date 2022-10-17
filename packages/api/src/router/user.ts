import { t } from '../trpc'
import { z } from 'zod'
import { protectedProcedure } from '../procedure/protectedProcedure'
import { TRPCError } from '@trpc/server'
import { prisma } from '@acme/db'

export const userRouter = t.router({
    signUp: t.procedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                console.log(input)
                const createUser = await ctx.firebaseAdmin
                    .app()
                    .auth()
                    .createUser({
                        email: input.email,
                        password: input.password,
                    })
                console.log('no fail')

                const user = await ctx.prisma.user.create({
                    data: {
                        email: createUser.email,
                        firebaseId: createUser.uid,
                    },
                })

                return user
            } catch (error: any) {
                console.log('Error', error)
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error?.message
                        ? error?.message
                        : 'Error signing up user. Please try again later.',
                })
            }
        }),
})
