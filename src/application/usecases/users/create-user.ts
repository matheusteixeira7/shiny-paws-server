import { User } from '@domain/entities/user'
import { HashHandler } from '@infra/gateways/hash-handler'
import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '@application/repositories/UsersRepository'
import { EmailInUseError } from '@application/errors/email-in-use-error'

type UserProps = {
  name: string
  email: string
  password: string
}

@injectable()
export class CreateUser {
  constructor (
    @inject('InMemoryUsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute ({ name, email, password }: UserProps) {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new EmailInUseError()
    }

    const hashedPassword = await new HashHandler().generate(password)

    const newUser = User.create({
      name,
      email,
      password: hashedPassword
    })

    this.usersRepository.save(newUser)

    return newUser
  }
}
