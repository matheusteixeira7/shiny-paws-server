import {
  CustomersRepository,
  ServicesRepository,
  TransactionsRepository
} from '@application/repositories'
import { Transaction } from '@domain/entities'
import { injectable, inject } from 'tsyringe'

type CreateTransactionProps = {
  servicesIds: string[]
  isPaid: boolean
  customerId: string
};

@injectable()
export class CreateTransaction {
  constructor (
    @inject('InMemoryTransactionsRepository')
    private transactionsRepository: TransactionsRepository,
    @inject('InMemoryCustomersRepository')
    private customersRepository: CustomersRepository,
    @inject('InMemoryServicesRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({
    servicesIds,
    isPaid,
    customerId
  }: CreateTransactionProps): Promise<Transaction> {
    if (servicesIds.length === 0) {
      throw new Error('No services provided.')
    }

    const services = await this.servicesRepository.findByIds(servicesIds)

    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new Error('Customer not found')
    }

    const transaction = Transaction.create({
      customerId,
      isPaid,
      servicesIds,
      totalPrice: services.reduce((acc, service) => acc + service.price, 0)
    })

    await this.transactionsRepository.save(transaction)

    return transaction
  }
}
