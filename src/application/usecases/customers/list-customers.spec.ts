import { Customer } from '@domain/entities/customer'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { ListCustomers } from './list-customers'

describe('List customers use case', () => {
  it('should be able to list customers', async () => {
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new ListCustomers(customersRepository)

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

    await customersRepository.save(customer)
    await customersRepository.save(customer2)

    const customers = await sut.execute()

    expect(customers).toHaveLength(2)
  })
})
