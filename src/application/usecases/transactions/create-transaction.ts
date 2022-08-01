import { CustomersRepository, TransactionsRepository } from '@application/repositories'
import { Service, Transaction } from '@domain/entities'
import { injectable, inject } from 'tsyringe'

type TransactionProps = {
  services: Service[];
  isPaid: boolean;
  customerId: string;
};

@injectable()
export class CreateTransaction {
  constructor (
    @inject('InMemoryTransactionsRepository')
    private transactionsRepository: TransactionsRepository,
    @inject('InMemoryCustomersRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute ({
    services,
    isPaid,
    customerId
  }: TransactionProps): Promise<Transaction> {
    if (!services.length) {
      throw new Error('Transaction must have at least one service')
    }

    const total = services
      .map((service) => service.props.price)
      .reduce((acc, curr) => acc + curr)

    const newTransaction = Transaction.create({
      services,
      totalPrice: total,
      isPaid,
      customerId
    })

    this.transactionsRepository.save(newTransaction)

    return newTransaction
  }
}
