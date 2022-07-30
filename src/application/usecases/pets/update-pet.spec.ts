import { Customer, Pet } from '@domain/entities'
import { InMemoryCustomersRepository, InMemoryPetsRepository } from '@tests/repositories'
import { UpdatePet } from './update-pet'

let petsRepository: InMemoryPetsRepository
let customersRepository: InMemoryCustomersRepository
let sut: UpdatePet

describe('Update pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    customersRepository = new InMemoryCustomersRepository()
    sut = new UpdatePet(petsRepository, customersRepository)
  })
  it('should throw error if pet not found', async () => {
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
      ownerId: customer.id
    })).rejects.toThrow()
  })

  it('should be able to update pets name', async () => {
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

    customersRepository.save(customer)
    customersRepository.save(customer2)

    const pet = Pet.create({
      name: 'Apollo',
      breed: 'Labrador',
      specie: 'dog',
      owner: customer
    })

    await petsRepository.save(pet)

    Object.assign(pet, {
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
      ownerId: customer2.id
    })

    expect(result.props.name).toEqual(pet.props.name)
  })

  it('should be able to update pets specie', async () => {
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

    customersRepository.save(customer)
    customersRepository.save(customer2)

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
      ownerId: customer2.id
    })

    expect(result.props.specie).toEqual(updatedPet.props.specie)
  })

  it('should be able to update pets breed', async () => {
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

    customersRepository.save(customer)
    customersRepository.save(customer2)

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
      ownerId: customer2.id
    })

    expect(result.props.breed).toEqual(updatedPet.props.breed)
  })

  it('should be able to update pets owner', async () => {
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

    customersRepository.save(customer)
    customersRepository.save(customer2)

    const pet = Pet.create({
      name: 'Apollo',
      breed: 'Labrador',
      specie: 'dog',
      owner: customer
    })

    await petsRepository.save(pet)

    Object.assign(pet, {
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
      ownerId: customer2.id
    })

    expect(result.props.owner).toEqual(pet.props.owner)
  })
})
