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

  it('should be able to update a user name', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new UpdateUser(usersRepository)

    const user = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })

    await usersRepository.save(user)

    const updatedUser = Object.assign({}, user, {
      props: {
        ...user.props,
        name: 'Matheus',
        email: 'doe@example.com',
        password: '123456'
      }
    })

    const result = await sut.execute({
      id: user.id,
      name: 'Matheus',
      email: 'doe@example.com',
      password: '123456'
    })

    expect(result.props.name).toEqual(updatedUser.props.name)
  })

  it('should be able to update a user email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new UpdateUser(usersRepository)

    const user = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })

    await usersRepository.save(user)

    const updatedUser = Object.assign({}, user, {
      props: {
        ...user.props,
        name: 'Matheus',
        email: 'doe@example.com',
        password: '123456'
      }
    })

    const result = await sut.execute({
      id: user.id,
      name: 'Matheus',
      email: 'doe@example.com',
      password: '123456'
    })

    expect(result.props.email).toEqual(updatedUser.props.email)
  })

  it('should be able to update a user password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new UpdateUser(usersRepository)

    const user = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })

    await usersRepository.save(user)

    const updatedUser = Object.assign({}, user, {
      props: {
        ...user.props,
        name: 'Matheus',
        email: 'doe@example.com',
        password: '123456'
      }
    })

    const result = await sut.execute({
      id: user.id,
      name: 'Matheus',
      email: 'doe@example.com',
      password: '123456'
    })

    expect(result.props.password).toEqual(updatedUser.props.password)
  })
})
