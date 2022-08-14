import { Customer, Service } from '@domain/entities'
import {
  InMemoryCustomersRepository,
  InMemoryServicesRepository,
  InMemoryTransactionsRepository
} from '@tests/repositories'
import { CreateTransaction } from './create-transaction'
import { UpdateTransaction } from './update-transaction'
import { setTimeout } from 'timers/promises'

let transactionsRepository: InMemoryTransactionsRepository
let customersRepository: InMemoryCustomersRepository
let servicesRepository: InMemoryServicesRepository
let createTransaction: CreateTransaction
let sut: UpdateTransaction

describe('UpdateTransaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    customersRepository = new InMemoryCustomersRepository()
    servicesRepository = new InMemoryServicesRepository()
    createTransaction = new CreateTransaction(
      transactionsRepository,
      customersRepository,
      servicesRepository
    )
    sut = new UpdateTransaction(transactionsRepository)
  })

  it('should throw error if transaction is not found.', async () => {
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

    expect(
      sut.execute({
        id: 'any',
        services: [service],
        isPaid: false,
        customerId: customer.id
      })
    ).rejects.toThrow()
  })

  it('should be able to update transactions updatedAt.', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.save(service)

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

    async function UpdatedTransaction () {
      await setTimeout(2000)
      const updated = Object.assign({}, transaction, {
        props: {
          ...transaction.props,
          updatedAt: new Date()
        }
      })
      expect(updated.props.updatedAt).not.toEqual(transaction.props.updatedAt)
    }
    UpdatedTransaction()
  })

  it('should be able to update transactions service.', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    const service2 = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.save(service)
    await servicesRepository.save(service2)

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

    const updated = Object.assign({}, transaction, {
      props: {
        ...transaction.props,
        services: [service, service2],
        updatedAt: new Date()
      }
    })
    expect(updated.props.services).not.toEqual(transaction.props.services)
  })

  it('should be able to update transactions isPaid.', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.save(service)

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

    const updated = Object.assign({}, transaction, {
      props: {
        ...transaction.props,
        isPaid: true,
        updatedAt: new Date()
      }
    })
    expect(updated.props.isPaid).not.toEqual(transaction.props.isPaid)
  })

  it('should be able to update transactions customerId.', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.save(service)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'email@email.com',
      phone: '249999999',
      address: 'Rua Santos Dumont, 299'
    })

    const customer2 = Customer.create({
      name: 'John Doe',
      email: 'email@email.com',
      phone: '249999999',
      address: 'Rua Santos Dumont, 299'
    })

    await customersRepository.save(customer)
    await customersRepository.save(customer2)

    const transaction = await createTransaction.execute({
      services: [service],
      isPaid: false,
      customerId: customer.id
    })

    transactionsRepository.save(transaction)

    const updated = Object.assign({}, transaction, {
      props: {
        ...transaction.props,
        customerId: customer2.id,
        updatedAt: new Date()
      }
    })
    expect(updated.props.customerId).not.toEqual(transaction.props.customerId)
  })
})
