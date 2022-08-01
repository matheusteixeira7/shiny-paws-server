import { Service, Customer } from '@domain/entities'
import { InMemoryCustomersRepository, InMemoryTransactionsRepository } from '@tests/repositories'
import { CreateTransaction } from './create-transaction'
import { GetTransaction } from './get-transaction'

let transactionsRepository: InMemoryTransactionsRepository
let customersRepository: InMemoryCustomersRepository
let createTransaction: CreateTransaction
let sut: GetTransaction

describe('GetTransaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    customersRepository = new InMemoryCustomersRepository()
    createTransaction = new CreateTransaction(transactionsRepository, customersRepository)
    sut = new GetTransaction(transactionsRepository)
  })

  it('should throw error if transaction does not exist.', async () => {
    await expect(sut.execute('1')).rejects.toThrow()
  })

  it('should be able to get a transaction.', async () => {
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

    await customersRepository.save(customer)

    const transaction = await createTransaction.execute({
      services: [service],
      isPaid: false,
      customerId: customer.id
    })

    transactionsRepository.save(transaction)

    expect(await sut.execute(transaction.id)).toEqual(transaction)
  })
})
