import { ServicesRepository } from '@application/repositories/ServicesRepository'

type ServiceProps = {
  id: string
  name: string
  price: number
}

export class UpdateService {
  constructor (
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({ id, name, price }: ServiceProps) {
    const service = await this.servicesRepository.findById(id)

    if (!service) {
      throw new Error('Service not found.')
    }

    Object.assign(service, {
      name,
      price
    })

    this.servicesRepository.save(service)

    return service
  }
}
