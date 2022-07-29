import { CustomersRepository } from '@application/repositories/CustomersRepository'
import { PetsRepository } from '@application/repositories/PetsRepository'
import { ServicesRepository } from '@application/repositories/ServicesRepository'
import { UsersRepository } from '@application/repositories/UsersRepository'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { InMemoryPetsRepository } from '@tests/repositories/in-memory-pets-repository'
import { InMemoryServicesRepository } from '@tests/repositories/in-memory-services-repository'
import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'
import { container } from 'tsyringe'

container.registerSingleton<CustomersRepository>('InMemoryCustomersRepository', InMemoryCustomersRepository)
container.registerSingleton<PetsRepository>('InMemoryPetsRepository', InMemoryPetsRepository)
container.registerSingleton<ServicesRepository>('InMemoryServicesRepository', InMemoryServicesRepository)
container.registerSingleton<UsersRepository>('InMemoryUsersRepository', InMemoryUsersRepository)
