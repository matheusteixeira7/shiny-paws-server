import { Customer } from '@domain/entities/customer'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { CreateCustomer } from './create-customer'

describe('Create customer use case', () => {
  it('should throw error if customer already exists', async () => {
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new CreateCustomer(customersRepository)

    const customer = Customer.create({
      name: 'Diego',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    customersRepository.save(customer)

    await expect(sut.execute({
      name: 'Diego',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })).rejects.toThrowError('Customer already exists.')
  })

  it('should be able to create a new user', async () => {
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new CreateCustomer(customersRepository)

    const customer = await sut.execute({
      name: 'Diego',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    expect(customer).toBeInstanceOf(Customer)
  })
})
