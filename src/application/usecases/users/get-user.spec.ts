import { User } from '@domain/entities/user'
import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'
import { GetUser } from './get-user'

describe('Get user use case', () => {
  it('should throw error if user do not exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new GetUser(usersRepository)

    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('User not found.')
  })

  it('should be able to get an user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new GetUser(usersRepository)

    const user = User.create({
      name: 'Diego',
      email: 'asd@email.com',
      password: '123456'
    })

    await usersRepository.save(user)

    const result = await sut.execute({
      id: user.id
    })

    expect(result).toEqual(user)
  })
})
