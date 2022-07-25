import { UsersRepository } from '@application/repositories/UsersRepository'

type UserProps = {
  id: string
  name: string
  email: string
  password: string
}

export class UpdateUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute ({ name, id, email, password }: UserProps) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new Error('User not found.')
    }

    Object.assign(user, {
      name,
      email,
      password
    })

    this.usersRepository.save(user)

    return user
  }
}
