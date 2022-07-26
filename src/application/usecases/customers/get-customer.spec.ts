import { Customer } from '@domain/entities/customer'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { GetCustomer } from './get-customer'

describe('Get customer use case', () => {
  it('should throw error if customer do not exists', async () => {
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new GetCustomer(customersRepository)

    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Customer not found.')
  })

  it('should be able to get a customer', async () => {
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new GetCustomer(customersRepository)

    const customer = Customer.create({
      name: 'Diego',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.save(customer)

    const result = await sut.execute({
      id: customer.id
    })

    expect(result).toEqual(customer)
  })
})
