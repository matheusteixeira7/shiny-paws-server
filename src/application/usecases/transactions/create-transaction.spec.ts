import { Customer, Service } from '@domain/entities'
import { InMemoryCustomersRepository, InMemoryTransactionsRepository } from '@tests/repositories'
import { CreateTransaction } from './create-transaction'

let transactionsRepository: InMemoryTransactionsRepository
let customersRepository: InMemoryCustomersRepository
let sut: CreateTransaction

describe('CreateTransaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    customersRepository = new InMemoryCustomersRepository()
    sut = new CreateTransaction(transactionsRepository, customersRepository)
  })

  it('should not be able to create a transaction without services', async () => {
    const customer = await Customer.create({
      name: 'John Doe',
      email: 'doe@email.com',
      phone: '+5511999999999',
      address: '123 Main St'
    })

    expect(sut.execute({
      services: [],
      isPaid: false,
      customerId: customer.id
    })).rejects.toThrow()
  })

  it('should not be able to create a transaction without customer', async () => {
    expect(sut.execute({
      services: [],
      isPaid: false,
      customerId: ''
    })).rejects.toThrow()
  })

  it('should return a transaction', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    const service2 = Service.create({
      name: 'Cortar unha',
      price: 80
    })

    const customer = Customer.create({
      name: 'John Doe',
      email: 'email@email.com',
      phone: '249999999',
      address: 'Rua Santos Dumont, 299'
    })

    const transaction = await sut.execute({
      services: [service, service2],
      isPaid: false,
      customerId: customer.id
    })

    expect(transaction).toHaveProperty('id')
  })
})
