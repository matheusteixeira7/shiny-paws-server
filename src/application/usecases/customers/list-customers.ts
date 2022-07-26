import { CustomersRepository } from '@application/repositories/CustomersRepository'

export class ListCustomers {
  constructor (
    private customersRepository: CustomersRepository
  ) {}

  async execute () {
    return this.customersRepository.list()
  }
}
