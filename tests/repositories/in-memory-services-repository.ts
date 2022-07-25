import { ServicesRepository } from '@application/repositories/ServicesRepository'
import { Service } from '@domain/entities/service'

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Service[] = []

  async findById (id: string): Promise<Service | null> {
    const service = this.items.find(service => service.id === id)

    if (!service) {
      return null
    }

    return service
  }

  async findByName (name: string): Promise<Service | null> {
    const service = this.items.find(service => service.props.name === name)

    if (!service) {
      return null
    }

    return service
  }

  async save (service: Service): Promise<Service> {
    this.items.push(service)

    return service
  }

  async list (): Promise<Service[]> {
    return this.items
  }
}
