import { UsersRepository } from '@application/repositories/UsersRepository'
import { User } from '@domain/entities/user'
import { HashHandler } from '@infra/gateways/hash-handler'
import { inject, injectable } from 'tsyringe'
import { JwtTokenHandler } from '@infra/gateways/jwt-token-handler'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
export class CreateSession {
  constructor (
    @inject('InMemoryUsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found.')
    }

    const passwordConfirmed = await new HashHandler().compare(password, user.props.password)

    if (!passwordConfirmed) {
      throw new Error('Incorrect password.')
    }

    const token = await new JwtTokenHandler().generate(user.id)

    return { user, token }
  }
}
