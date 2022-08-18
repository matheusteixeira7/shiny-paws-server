import { UsersRepository } from '@application/repositories'
import { User } from '@domain/entities'
import prisma from '../client'

export class PrismaUsersRepository implements UsersRepository {
  findById (id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  findByEmail (email: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  save (user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }

  delete (id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async list (): Promise<User[]> {
    return await prisma.user.findMany()
  }
}
