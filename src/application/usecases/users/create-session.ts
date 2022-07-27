import { UsersRepository } from '@application/repositories/UsersRepository'
import { User } from '@domain/entities/user'
import { JwtTokenHandler } from '@infra/gateways/jwt-token-handler'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

export class CreateSession {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found.')
    }

    const passwordConfirmed = await this.usersRepository.comparePassword(password, user.props.password)

    if (!passwordConfirmed) {
      throw new Error('Incorrect password.')
    }

    const token = await new JwtTokenHandler().generate(user.id)

    return { user, token }
  }
}
