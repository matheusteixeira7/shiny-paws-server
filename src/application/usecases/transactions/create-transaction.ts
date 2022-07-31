import { TransactionsRepository } from '@application/repositories'
import { Service, Transaction } from '@domain/entities'
import { injectable, inject } from 'tsyringe'

type TransactionProps = {
  transaction: Service[]
  totalPrice: number
  isPaid: boolean
  customerId: string
}

@injectable()
export class CreateTransaction {
  constructor (
    @inject('InMemoryTransactionsRepository')
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute ({ transaction, totalPrice, isPaid, customerId }: TransactionProps): Promise<Transaction> {
    const newTransaction = Transaction.create({
      transaction,
      totalPrice,
      isPaid,
      customerId
    })

    this.transactionsRepository.save(newTransaction)

    return newTransaction
  }
}
