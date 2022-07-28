import { UsersRepository } from '@application/repositories/UsersRepository'
import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'
import { container } from 'tsyringe'

container.registerSingleton<UsersRepository>('InMemoryUsersRepository', InMemoryUsersRepository)
