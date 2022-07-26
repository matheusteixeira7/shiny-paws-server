import { Customer } from '@domain/entities/customer'
import { InMemoryCustomersRepository } from '@tests/repositories/in-memory-customers-repository'
import { UpdateCustomer } from './update-customer'

describe('Update customer use case', () => {
  it('should throw error if customer not found', async () => {
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new UpdateCustomer(customersRepository)

    await expect(sut.execute({
      id: '1',
      name: 'Matheus Teixeira',
      email: 'teixeira@email.com',
      phone: '5524999999999',
      address: '123 Main St'
    })).rejects.toThrowError('Customer not found.')
  })

  it('should be able to update customer name', async () => {
    const customersRepository = new InMemoryCustomersRepository()
    const sut = new UpdateCustomer(customersRepository)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.save(customer)

    Object.assign(customer, {
      props: {
        ...customer.props,
        name: 'Matheus Teixeira',
        email: 'teixeira@example.com',
        phone: '123456',
        address: '123 Main St'
      }
    })

    const result = await sut.execute({
      id: customer.id,
      name: 'Matheus Teixeira',
      email: 'teixeira@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    expect(result.props.name).toEqual(customer.props.name)
  })
})
