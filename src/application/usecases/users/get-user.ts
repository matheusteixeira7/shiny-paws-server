import { UsersRepository } from '@application/repositories/UsersRepository'

type UserProps = {
  id: string
}

export class GetUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute ({ id }: UserProps) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new Error('User not found.')
    }

    return user
  }
}
