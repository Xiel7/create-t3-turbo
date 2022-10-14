import { t } from '../trpc'
import { z } from 'zod'
import { protectedProcedure } from '../procedure/protectedProcedure'

export const postRouter = t.router({
    all: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany()
    }),
    byId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.post.findFirst({ where: { id: input } })
    }),
    create: protectedProcedure
        .input(z.object({ title: z.string(), content: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.post.create({ data: input })
        }),
})
