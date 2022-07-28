import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '@application/repositories/UsersRepository'

type UserProps = {
  id: string
}

@injectable()
export class DeleteUser {
  constructor (
    @inject('InMemoryUsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute ({ id }: UserProps) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new Error('User not found.')
    }

    this.usersRepository.delete(id)
  }
}
