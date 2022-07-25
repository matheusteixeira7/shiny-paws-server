import { ServicesRepository } from '@application/repositories/ServicesRepository'

type UserProps = {
  id: string
}

export class GetService {
  constructor (
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
