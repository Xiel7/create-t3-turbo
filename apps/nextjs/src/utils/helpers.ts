import { NextApiRequest } from 'next/types'

export const extractToken = (req: NextApiRequest) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1] as string
    } else if (req.query && req.query.token) {
        return req.query.token as string
    }
    return null
}
