import { Customer } from '@domain/entities/customer'
import { Pet } from '@domain/entities/pet'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { InMemoryPetsRepository } from '@tests/repositories/in-memory-pets-repository'
import { DeletePet } from './delete-pet'

let petsRepository: InMemoryPetsRepository
let customersRepository: InMemoryCustomersRepository
let sut: DeletePet

describe('Delete pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    customersRepository = new InMemoryCustomersRepository()
    sut = new DeletePet(petsRepository)
  })
  it('should throw error if pet not found exists', async () => {
    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Pet not found.')
  })

  it('should be able to delete a pet', async () => {
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
