import { UsersRepository } from '@application/repositories/UsersRepository'
import { User } from '@domain/entities/user'
import { hash } from 'bcryptjs'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById (id: string): Promise<User | null> {
    const user = this.items.find(user => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = this.items.find(user => user.props.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async save (user: User): Promise<User> {
    this.items.push(user)

    return user
  }

  async delete (id: string): Promise<void> {
    const index = this.items.findIndex(user => user.id === id)

    if (index === -1) {
      throw new Error('User not found.')
    }

    this.items.splice(index, 1)
  }

  async list (): Promise<User[]> {
    return this.items
  }

  async hashPassword (password: string): Promise<string> {
    return await hash(password, 8)
  }
}
