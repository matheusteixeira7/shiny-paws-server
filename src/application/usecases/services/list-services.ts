import { ServicesRepository } from '@application/repositories/ServicesRepository'

export class ListServices {
  constructor (
    private servicesRepository: ServicesRepository
  ) {}

  async execute () {
    return this.servicesRepository.list()
  }
}
