import { CustomersRepository } from '@application/repositories/CustomersRepository'
import { inject, injectable } from 'tsyringe'

type CustomerProps = {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

@injectable()
export class UpdateCustomer {
  constructor (
    @inject('InMemoryCustomersRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute ({ id, name, email, phone, address }: CustomerProps) {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new Error('Customer not found.')
    }

    Object.assign(customer, {
      props: {
        ...customer.props,
        name,
        email,
        phone,
        address,
        updatedAt: new Date()
      }
    })

    this.customersRepository.save(customer)

    return customer
  }
}
