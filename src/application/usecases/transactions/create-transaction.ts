import {
  CustomersRepository,
  ServicesRepository,
  TransactionsRepository
} from '@application/repositories'
import { Service, Transaction } from '@domain/entities'
import { injectable, inject } from 'tsyringe'

type TransactionProps = {
  services: Service[]
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
    services,
    isPaid,
    customerId
  }: TransactionProps): Promise<Transaction> {
    if (services.length === 0) {
      throw new Error('No services provided.')
    }

    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new Error('Customer not found')
    }

    const transaction = Transaction.create({
      customerId,
      isPaid,
      services,
      totalPrice: services.reduce((acc, service) => acc + service.props.price, 0)
    })

    await this.transactionsRepository.save(transaction)

    return transaction
  }
}
