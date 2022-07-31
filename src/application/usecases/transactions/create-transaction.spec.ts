import { Customer, Service } from '@domain/entities'
import { InMemoryTransactionsRepository } from '@tests/repositories/in-memory-transactions-repository'
import { CreateTransaction } from './create-transaction'

let transactionsRepository: InMemoryTransactionsRepository
let sut: CreateTransaction

describe('CreateTransaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new CreateTransaction(transactionsRepository)
  })
  it('should return a transaction', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    const customer = Customer.create({
      name: 'John Doe',
      email: 'email@email.com',
      phone: '249999999',
      address: 'Rua Santos Dumont, 299'

    })

    const transaction = await sut.execute({
      transaction: [service],
      totalPrice: 120,
      isPaid: false,
      customerId: customer.id
    })

    expect(transaction).toHaveProperty('id')
  })
})
