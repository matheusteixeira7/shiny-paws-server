import { Service } from '@domain/entities'

export interface ServicesRepository {
  findById(id: string): Promise<Service | null>
  findByIds(ids: string[]): Promise<Service[]>
  findByName(name: string): Promise<Service | null>
  save (service: Service): Promise<Service>
  list (): Promise<Service[]>
  delete (id: string): Promise<void>
}
