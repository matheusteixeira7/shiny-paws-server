import { UsersRepository } from '@application/repositories/UsersRepository'

type UserProps = {
  id: string
}

export class DeleteUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute ({ id }: UserProps) {
    this.usersRepository.delete(id)
  }
}
