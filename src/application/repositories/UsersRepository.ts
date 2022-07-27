import { User } from '@domain/entities/user'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  save (user: User): Promise<User>
  delete (id: string): Promise<void>
  list (): Promise<User[]>
}
