import { Transaction } from '@domain/entities'

export interface TransactionsRepository {
  findById(id: string): Promise<Transaction | null>
  save (customer: Transaction): Promise<Transaction>
  list (): Promise<Transaction[]>
  delete (id: string): Promise<void>
}
