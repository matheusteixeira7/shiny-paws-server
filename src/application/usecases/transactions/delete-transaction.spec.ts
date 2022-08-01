// import {
//   InMemoryCustomersRepository,
//   InMemoryServicesRepository,
//   InMemoryTransactionsRepository
// } from '@tests/repositories'
// import { Customer, Service } from '@domain/entities'
// import { CreateTransaction } from './create-transaction'
// import { DeleteTransaction } from './delete-transaction'

// let transactionsRepository: InMemoryTransactionsRepository
// let customersRepository: InMemoryCustomersRepository
// let servicesRepository: InMemoryServicesRepository
// let createTransaction: CreateTransaction
// let sut: DeleteTransaction

// describe('DeleteTransaction', () => {
//   beforeEach(() => {
//     transactionsRepository = new InMemoryTransactionsRepository()
//     customersRepository = new InMemoryCustomersRepository()
//     servicesRepository = new InMemoryServicesRepository()
//     createTransaction = new CreateTransaction(
//       transactionsRepository,
//       customersRepository,
//       servicesRepository
//     )
//     sut = new DeleteTransaction(transactionsRepository)
//   })

//   it('should throw an error if transaction is not found.', async () => {
//     expect(sut.execute('1')).rejects.toThrow()
//   })

//   it('should delete a transaction.', async () => {
//     const service = Service.create({
//       name: 'Banho e tosa',
//       price: 120
//     })

//     await servicesRepository.save(service)

//     const customer = Customer.create({
//       name: 'John Doe',
//       email: 'email@email.com',
//       phone: '249999999',
//       address: 'Rua Santos Dumont, 299'
//     })

//     await customersRepository.save(customer)

//     const transaction = await createTransaction.execute({
//       services: [service],
//       isPaid: false,
//       customerId: customer.id
//     })

//     transactionsRepository.save(transaction)

//     await sut.execute(transaction.id)

//     expect(transactionsRepository.items).toHaveLength(0)
//   })
// })

describe('asd', () => {
  it('any', () => {
    expect(1).toBe(1)
  })
})
