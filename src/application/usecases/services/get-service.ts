import { ServicesRepository } from '@application/repositories/ServicesRepository'
import { inject, injectable } from 'tsyringe'

type UserProps = {
  id: string
}

@injectable()
export class GetService {
  constructor (
    @inject('InMemoryServicesRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({ id }: UserProps) {
    const service = await this.servicesRepository.findById(id)

    if (!service) {
      throw new Error('Service not found.')
    }

    return service
  }
}
