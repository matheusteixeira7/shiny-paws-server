import { ServicesRepository } from '@application/repositories/ServicesRepository'
import { Service } from '@domain/entities/service'

type ServiceProps = {
  name: string
  price: number
}

export class CreateService {
  constructor (
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({ name, price }: ServiceProps) {
    const service = await this.servicesRepository.findByName(name)

    if (service) {
      throw new Error('Service already exists.')
    }

    const newService = Service.create({
      name,
      price
    })

    this.servicesRepository.save(newService)

    return newService
  }
}
