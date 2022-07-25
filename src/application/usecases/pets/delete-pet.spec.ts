import { Customer } from '@domain/entities/customer'
import { Pet } from '@domain/entities/pet'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { InMemoryPetsRepository } from '@tests/repositories/in-memory-pets-repository'
import { DeletePet } from './delete-pet'

describe('Delete pet use case', () => {
  it('should throw error if pet not found exists', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new DeletePet(petsRepository)

    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Pet not found.')
  })

  it('should be able to delete a pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new DeletePet(petsRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.save(customer)

    const pet = Pet.create({
      name: 'Apollo',
      specie: 'dog',
      breed: 'labrador',
      owner: customer
    })

    await petsRepository.save(pet)

    await sut.execute({
      id: pet.id
    })

    expect(petsRepository.items).toHaveLength(0)
  })
})
