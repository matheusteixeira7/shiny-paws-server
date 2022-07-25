import { UsersRepository } from '@application/repositories/UsersRepository'

export class ListUsers {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute () {
    return this.usersRepository.list()
  }
}
