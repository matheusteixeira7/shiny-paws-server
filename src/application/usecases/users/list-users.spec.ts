import { User } from '@domain/entities/user'
import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'
import { ListUsers } from './list-users'

describe('List user use case', () => {
  it('should be able to list users', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new ListUsers(usersRepository)

    const user1 = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })

    const user2 = User.create({
      name: 'Matheus',
      email: 'doe@example.com',
      password: '123456'
    })

    await usersRepository.save(user1)
    await usersRepository.save(user2)

    const users = await sut.execute()

    expect(users).toHaveLength(2)
  })
})
