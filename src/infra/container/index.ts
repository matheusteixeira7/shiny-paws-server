import { CustomersRepository } from '@application/repositories/CustomersRepository'
import { UsersRepository } from '@application/repositories/UsersRepository'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'
import { container } from 'tsyringe'

container.registerSingleton<UsersRepository>('InMemoryUsersRepository', InMemoryUsersRepository)
container.registerSingleton<CustomersRepository>('InMemoryCustomersRepository', InMemoryCustomersRepository)
