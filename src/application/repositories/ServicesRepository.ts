import { Service } from '@domain/entities/service'

export interface ServicesRepository {
  findById(id: string): Promise<Service | null>
  findByName(name: string): Promise<Service | null>
  save (customer: Service): Promise<Service>
  list (): Promise<Service[]>
}
