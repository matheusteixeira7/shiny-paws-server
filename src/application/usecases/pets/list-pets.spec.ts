import { Customer } from '@domain/entities/customer'
import { Pet } from '@domain/entities/pet'
import { InMemoryPetsRepository } from '@tests/repositories/in-memory-pets-repository'
import { ListPets } from './list-pets'

describe('List pets use case', () => {
  it('should be able to list pets', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new ListPets(petsRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const pet1 = Pet.create({
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
      owner: customer
    })

    const pet2 = Pet.create({
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
      owner: customer
    })

    await petsRepository.save(pet1)
    await petsRepository.save(pet2)

    const pets = await sut.execute()

    expect(pets).toHaveLength(2)
  })
})
