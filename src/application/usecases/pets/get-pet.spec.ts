import { Customer } from '@domain/entities/customer'
import { Pet } from '@domain/entities/pet'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { InMemoryPetsRepository } from '@tests/repositories/in-memory-pets-repository'
import { GetPet } from './get-pet'

describe('Get pet use case', () => {
  it('should throw error if pet do not exists', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new GetPet(petsRepository)

    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Pet not found.')
  })

  it('should be able to get a pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new GetPet(petsRepository)

    const customer = Customer.create({
      name: 'Diego',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.save(customer)

    const pet = Pet.create({
      name: 'Banho e tosa',
      specie: 'dog',
      breed: 'labrador',
      owner: customer

    })

    await petsRepository.save(pet)

    const result = await sut.execute({
      id: pet.id
    })

    expect(result).toEqual(pet)
  })
})
