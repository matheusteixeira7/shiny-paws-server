import { UsersRepository } from '@application/repositories/UserRepository'
import { User } from '@domain/entities/user'

type UserProps = {
  name: string
  email: string
  password: string
}

export class CreateUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute ({ name, email, password }: UserProps) {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new Error('User already exists.')
    }

    const newUser = User.create({
      name,
      email,
      password
    })

    this.usersRepository.save(newUser)

    return newUser
  }
}
