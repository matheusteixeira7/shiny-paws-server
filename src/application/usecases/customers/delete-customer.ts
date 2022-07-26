import { CustomersRepository } from '@application/repositories/CustomersRepository'

type CustomerProps = {
  id: string
}

export class DeleteCustomer {
  constructor (
    private customersRepository: CustomersRepository
  ) {}

  async execute ({ id }: CustomerProps) {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new Error('Customer not found.')
    }

    this.customersRepository.delete(id)
  }
}
