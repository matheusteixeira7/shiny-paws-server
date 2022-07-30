import { CustomersRepository, PetsRepository, ServicesRepository, UsersRepository } from '@application/repositories'
import { InMemoryCustomersRepository, InMemoryPetsRepository, InMemoryServicesRepository, InMemoryUsersRepository } from '@tests/repositories'
import { container } from 'tsyringe'

container.registerSingleton<CustomersRepository>('InMemoryCustomersRepository', InMemoryCustomersRepository)
container.registerSingleton<PetsRepository>('InMemoryPetsRepository', InMemoryPetsRepository)
container.registerSingleton<ServicesRepository>('InMemoryServicesRepository', InMemoryServicesRepository)
container.registerSingleton<UsersRepository>('InMemoryUsersRepository', InMemoryUsersRepository)
