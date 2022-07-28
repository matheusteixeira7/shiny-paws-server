import { ServicesRepository } from '@application/repositories/ServicesRepository'
import { inject, injectable } from 'tsyringe'

type ServiceProps = {
  id: string
}

@injectable()
export class DeleteService {
  constructor (
    @inject('InMemoryCustomersRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({ id }: ServiceProps) {
    const service = await this.servicesRepository.findById(id)

    if (!service) {
      throw new Error('Service not found.')
    }

    this.servicesRepository.delete(id)
  }
}
