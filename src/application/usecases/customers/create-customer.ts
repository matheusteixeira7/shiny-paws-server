import { CustomersRepository } from '@application/repositories/CustomersRepository'
import { Customer } from '@domain/entities/customer'
import { Pet } from '@domain/entities/pet'

type CustomerProps = {
  name: string
  email: string
  phone: string
  address: string
  pets?: Pet[]
}

export class CreateCustomer {
  constructor (
    private customersRepository: CustomersRepository
  ) {}

  async execute ({ name, email, phone, address }: CustomerProps) {
    const customer = await this.customersRepository.findByEmail(email)

    if (customer) {
      throw new Error('Customer already exists.')
    }

    const newCustomer = Customer.create({
      name,
      email,
      phone,
      address
    })

    this.customersRepository.save(newCustomer)

    return newCustomer
  }
}
