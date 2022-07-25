import { ServicesRepository } from '@application/repositories/ServicesRepository'

type ServiceProps = {
  id: string
}

export class DeleteService {
  constructor (
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
