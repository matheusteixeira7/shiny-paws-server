import { Customer } from '@domain/entities/customer'

export interface CustomersRepository {
  findById(id: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  save (customer: Customer): Promise<Customer>
  delete (id: string): Promise<void>
  list (): Promise<Customer[]>
}
