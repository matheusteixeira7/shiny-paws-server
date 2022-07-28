import { ServicesRepository } from '@application/repositories/ServicesRepository'
import { Service } from '@domain/entities/service'
import { inject, injectable } from 'tsyringe'

type ServiceProps = {
  name: string
  price: number
}
@injectable()
export class CreateService {
  constructor (
    @inject('InMemoryCustomersRepository')
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
