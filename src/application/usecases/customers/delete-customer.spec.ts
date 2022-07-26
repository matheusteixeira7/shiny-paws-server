import { Customer } from '@domain/entities/customer'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { DeleteCustomer } from './delete-customer'

describe('Delete customer use case', () => {
  it('should throw error if customer not found', async () => {
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new DeleteCustomer(customersRepository)

    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Customer not found.')
  })

  it('should be able to delete a customer', async () => {
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new DeleteCustomer(customersRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.save(customer)

    await sut.execute({
      id: customer.id
    })

    expect(customersRepository.items).toHaveLength(0)
  })
})
