import { User } from '@domain/entities/user'
import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'
import { DeleteUser } from './delete-user'
import { UpdateUser } from './update-user'

describe('Delete user use case', () => {
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

  it('should be able to delete a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new DeleteUser(usersRepository)

    const user = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })

    await usersRepository.save(user)

    await sut.execute({
      id: user.id
    })

    expect(usersRepository.items).toHaveLength(0)
  })
})
