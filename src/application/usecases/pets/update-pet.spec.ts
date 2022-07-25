import { Customer } from '@domain/entities/customer'
import { Pet } from '@domain/entities/pet'
import { InMemoryPetsRepository } from '@tests/repositories/in-memory-pets-repository'
import { UpdatePet } from './update-pet'

describe('Update pet use case', () => {
  it('should throw error if pet not found', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new UpdatePet(petsRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await expect(sut.execute({
      id: '1',
      name: 'Apollo',
      breed: 'Pitbull',
      specie: 'dog',
      owner: customer
    })).rejects.toThrowError('Pet not found.')
  })

  it('should be able to update pets name', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new UpdatePet(petsRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const customer2 = Customer.create({
      name: 'Matheus Teixeira',
      email: 'teixeira@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const pet = Pet.create({
      name: 'Apollo',
      breed: 'Labrador',
      specie: 'dog',
      owner: customer
    })

    await petsRepository.save(pet)

    const updatedPet = Object.assign({}, pet, {
      props: {
        ...pet.props,
        name: 'Brownie',
        specie: 'dog' as const,
        breed: 'Pitbull',
        owner: customer2
      }
    })

    const result = await sut.execute({
      id: pet.id,
      name: 'Brownie',
      specie: 'dog' as const,
      breed: 'Pitbull',
      owner: customer2
    })

    expect(result.props.name).toEqual(updatedPet.props.name)
  })

  it('should be able to update pets specie', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new UpdatePet(petsRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const customer2 = Customer.create({
      name: 'Matheus Teixeira',
      email: 'teixeira@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const pet = Pet.create({
      name: 'Apollo',
      breed: 'Labrador',
      specie: 'dog',
      owner: customer
    })

    await petsRepository.save(pet)

    const updatedPet = Object.assign({}, pet, {
      props: {
        ...pet.props,
        name: 'Brownie',
        specie: 'dog' as const,
        breed: 'Pitbull',
        owner: customer2
      }
    })

    const result = await sut.execute({
      id: pet.id,
      name: 'Brownie',
      specie: 'dog' as const,
      breed: 'Pitbull',
      owner: customer2
    })

    expect(result.props.specie).toEqual(updatedPet.props.specie)
  })

  it('should be able to update pets breed', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new UpdatePet(petsRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const customer2 = Customer.create({
      name: 'Matheus Teixeira',
      email: 'teixeira@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const pet = Pet.create({
      name: 'Apollo',
      breed: 'Labrador',
      specie: 'dog',
      owner: customer
    })

    await petsRepository.save(pet)

    const updatedPet = Object.assign({}, pet, {
      props: {
        ...pet.props,
        name: 'Brownie',
        specie: 'dog' as const,
        breed: 'Pitbull',
        owner: customer2
      }
    })

    const result = await sut.execute({
      id: pet.id,
      name: 'Brownie',
      specie: 'dog' as const,
      breed: 'Pitbull',
      owner: customer2
    })

    expect(result.props.breed).toEqual(updatedPet.props.breed)
  })

  it('should be able to update pets owner', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new UpdatePet(petsRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const customer2 = Customer.create({
      name: 'Matheus Teixeira',
      email: 'teixeira@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const pet = Pet.create({
      name: 'Apollo',
      breed: 'Labrador',
      specie: 'dog',
      owner: customer
    })

    await petsRepository.save(pet)

    const updatedPet = Object.assign({}, pet, {
      props: {
        ...pet.props,
        name: 'Brownie',
        specie: 'dog' as const,
        breed: 'Pitbull',
        owner: customer2
      }
    })

    const result = await sut.execute({
      id: pet.id,
      name: 'Brownie',
      specie: 'dog' as const,
      breed: 'Pitbull',
      owner: customer2
    })

    expect(result.props.owner).toEqual(updatedPet.props.owner)
  })
})
