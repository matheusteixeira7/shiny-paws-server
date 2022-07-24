import { InMemoryUsersRepository } from '@tests/repositories/in-memory-user-repository'
import { User } from '@domain/entities/user'
import { CreateUser } from './create-user'

describe('Create user use case', () => {
  it('should throw error if user already exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new CreateUser(usersRepository)

    const user = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })

    usersRepository.items.push(user)

    await expect(sut.execute({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })).rejects.toThrowError('User already exists.')
  })

  it('should be able to create a new user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new CreateUser(usersRepository)

    const user = await sut.execute({
      name: 'Diego',
      email: 'asd@email.com',
      password: '123456'
    })

    expect(user).toBeInstanceOf(User)
  })
})
