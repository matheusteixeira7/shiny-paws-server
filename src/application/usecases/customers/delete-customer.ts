import { CustomersRepository } from '@application/repositories/CustomersRepository'
import { inject, injectable } from 'tsyringe'

type CustomerProps = {
  id: string
}

@injectable()
export class DeleteCustomer {
  constructor (
    @inject('InMemoryCustomersRepository')
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
