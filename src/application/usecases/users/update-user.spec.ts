import { User } from '@domain/entities/user'
import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'
import { UpdateUser } from './update-user'

describe('Update user use case', () => {
  it('should throw error if user not found exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new UpdateUser(usersRepository)

    await expect(sut.execute({
      id: '1',
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })).rejects.toThrowError('User not found.')
  })

  it('should be able to update a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new UpdateUser(usersRepository)

    const user = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })

    await usersRepository.save(user)

    await sut.execute({
      id: user.id,
      name: 'Matheus',
      email: 'doe@example.com',
      password: '123456'
    })

    expect(user).toBeInstanceOf(User)
  })
})
