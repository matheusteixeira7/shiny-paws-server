import { Customer, Service, Transaction } from '@domain/entities'
import {
  InMemoryCustomersRepository,
  InMemoryServicesRepository,
  InMemoryTransactionsRepository
} from '@tests/repositories'
import { CreateTransaction } from './create-transaction'

let transactionsRepository: InMemoryTransactionsRepository
let customersRepository: InMemoryCustomersRepository
let servicesRepository: InMemoryServicesRepository
let sut: CreateTransaction

describe('CreateTransaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    customersRepository = new InMemoryCustomersRepository()
    servicesRepository = new InMemoryServicesRepository()
    sut = new CreateTransaction(
      transactionsRepository,
      customersRepository,
      servicesRepository
    )
  })

  it('should not be able to create a transaction without services', async () => {
    const transaction = sut.execute({
      services: [],
      isPaid: false,
      customerId: 'any-id'
    })

    expect(transaction).rejects.toThrow()
  })

  it('should not be able to create a transaction if provided customer is not found', async () => {
    const service = Service.create({
      name: 'any',
      price: 120
    })

    const transaction = sut.execute({
      services: [service],
      isPaid: false,
      customerId: 'any-id'
    })

    expect(transaction).rejects.toThrow()
  })

  it('should not be able to create a transaction if one or more provided service is not found', async () => {
    const service = Service.create({
      name: 'any',
      price: 120
    })

    const service2 = Service.create({
      name: 'any',
      price: 120
    })

    await servicesRepository.save(service)

    const customer = Customer.create({
      name: 'any',
      address: 'any',
      email: 'any',
      phone: 'any'
    })

    const transaction = sut.execute({
      services: [service, service2],
      isPaid: false,
      customerId: customer.id
    })

    expect(transaction).rejects.toThrow()
  })
})
