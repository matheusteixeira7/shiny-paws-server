import { CustomersRepository } from '@application/repositories/CustomersRepository'

type CustomerProps = {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export class UpdateCustomer {
  constructor (
    private customersRepository: CustomersRepository
  ) {}

  async execute ({ id, name, email, phone, address }: CustomerProps) {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new Error('Customer not found.')
    }

    const updatedCustomer = Object.assign({}, customer, {
      props: {
        ...customer.props,
        name,
        email,
        phone,
        address,
        updatedAt: new Date()
      }
    })

    this.customersRepository.save(updatedCustomer)

    return updatedCustomer
  }
}
