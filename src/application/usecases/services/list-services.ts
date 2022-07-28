import { ServicesRepository } from '@application/repositories/ServicesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListServices {
  constructor (
    @inject('InMemoryCustomersRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute () {
    return this.servicesRepository.list()
  }
}
