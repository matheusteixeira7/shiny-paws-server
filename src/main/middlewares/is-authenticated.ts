import { NextFunction, Request, Response } from 'express'
import { JwtTokenHandler } from '@infra/gateways/jwt-token-handler'

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error('JWT Token is missing.')
  }
  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = await new JwtTokenHandler().validate(token)

    req.user = {
      id: decodedToken
    }

    return next()
  } catch {
    throw new Error('Invalid JWT Token.')
  }
}
