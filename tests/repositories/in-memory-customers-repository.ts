import { CustomersRepository } from '@application/repositories'
import { Customer } from '@domain/entities'

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

  async delete (id: string): Promise<void> {
    const index = this.items.findIndex(customer => customer.id === id)

    if (index === -1) {
      throw new Error('Customer not found.')
    }

    this.items.splice(index, 1)
  }

  async list (): Promise<Customer[]> {
    return this.items
  }
}
