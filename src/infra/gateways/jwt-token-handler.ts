import { TokenGenerator } from '@domain/contracts/gateways'
import authConfig from '@main/config/auth'

import { sign } from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGenerator {
  async generate (key: string): Promise<string> {
    const token = sign({}, authConfig.jwt.secret, {
      subject: key,
      expiresIn: authConfig.jwt.expiresIn
    })

    return token
  }

  // async validate (token: string): Promise<boolean> {
  //   const payload = verify(token, this.secret) as JwtPayload
  //   return payload.key
  // }
}
