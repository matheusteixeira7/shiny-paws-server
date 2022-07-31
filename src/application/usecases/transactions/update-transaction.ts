import { InvalidParamError } from '@application/errors'
import { TransactionsRepository } from '@application/repositories'
import { Service, Transaction } from '@domain/entities'
import { injectable, inject } from 'tsyringe'

type UpdateTransactionProps = {
  id: string;
  services: Service[];
  isPaid: boolean;
  customerId: string;
};

@injectable()
export class UpdateTransaction {
  constructor (
    @inject('InMemoryTransactionsRepository')
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute ({
    id,
    services,
    isPaid,
    customerId
  }: UpdateTransactionProps): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findById(id)

    if (!transaction) {
      throw new InvalidParamError('Transaction is not found.')
    }

    Object.assign(transaction, {
      services,
      isPaid,
      customerId
    })

    this.transactionsRepository.save(transaction)

    return transaction
  }
}
