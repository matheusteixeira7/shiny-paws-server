import { CustomersRepository } from '@application/repositories/CustomersRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListCustomers {
  constructor (
    @inject('InMemoryCustomersRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute () {
    return this.customersRepository.list()
  }
}
