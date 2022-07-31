import { Entity } from '../../core/domain/Entity'
import { Service } from './service'

type TransactionProps = {
  transaction: Service[]
  totalPrice: number
  isPaid: boolean
  customerId: string
  createdAt?: Date
  updatedAt?: Date
}

export class Transaction extends Entity<TransactionProps> {
  private constructor (props: TransactionProps, id?: string) {
    super(props, id)
  }

  static create (props: TransactionProps, id?: string) {
    const transaction = new Transaction({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    }, id)

    return transaction
  }
}
