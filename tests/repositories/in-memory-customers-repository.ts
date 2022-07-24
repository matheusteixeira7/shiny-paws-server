import { CustomersRepository } from '@application/repositories/CustomersRepository'
import { Customer } from '@domain/entities/customer'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async findById (id: string): Promise<Customer | null> {
    const customer = this.items.find(customer => customer.id === id)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail (email: string): Promise<Customer | null> {
    const customer = this.items.find(customer => customer.props.email === email)

    if (!customer) {
      return null
    }

    return customer
  }

  async save (customer: Customer): Promise<Customer> {
    this.items.push(customer)

    return customer
  }
}
