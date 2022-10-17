import { z } from 'zod'

export const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'Password required' }),
})

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
})

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password min 6 character' }),
})
