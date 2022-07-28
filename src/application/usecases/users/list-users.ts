import { UsersRepository } from '@application/repositories/UsersRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListUsers {
  constructor (
    @inject('InMemoryUsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute () {
    return this.usersRepository.list()
  }
}
