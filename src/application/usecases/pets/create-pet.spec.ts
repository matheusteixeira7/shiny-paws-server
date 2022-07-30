import { Customer } from '@domain/entities/customer'
import { Pet } from '@domain/entities/pet'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { InMemoryPetsRepository } from '@tests/repositories/in-memory-pets-repository'
import { CreatePet } from './create-pet'

describe('Create pet use case', () => {
  it('should throw an error if customer does not exist', async () => {
    const customersRepository = new InMemoryCustomersRepository()
    const petsRepository = new InMemoryPetsRepository()
    const sut = new CreatePet(petsRepository, customersRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await expect(sut.execute({
      name: 'Apollo',
      specie: 'dog',
      breed: 'labrador',
      ownerId: customer.id
    })).rejects.toThrow()
  })

  it('should be able to create a new pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new CreatePet(petsRepository, customersRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.save(customer)

    const pet = await sut.execute({
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
      ownerId: customer.id
    })

    expect(pet).toBeInstanceOf(Pet)
  })
})
