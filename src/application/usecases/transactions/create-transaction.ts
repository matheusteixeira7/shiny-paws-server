import { TransactionsRepository } from '@application/repositories'
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
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute ({
    services,
    isPaid,
    customerId
  }: TransactionProps): Promise<Transaction> {
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
