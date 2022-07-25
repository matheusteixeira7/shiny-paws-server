import { Service } from '@domain/entities/service'
import { InMemoryServicesRepository } from '@tests/repositories/in-memory-services-repository'
import { CreateService } from './create-service'

describe('Create service use case', () => {
  it('should throw error if service already exists', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new CreateService(servicesRepository)

    const service = Service.create({
      name: 'Banho e Tosa',
      price: 120
    })

    servicesRepository.items.push(service)

    await expect(sut.execute({
      name: 'Banho e Tosa',
      price: 120
    })).rejects.toThrowError('Service already exists.')
  })

  it('should be able to create a new service', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new CreateService(servicesRepository)

    const service = await sut.execute({
      name: 'Banho e Tosa',
      price: 120
    })

    expect(service).toBeInstanceOf(Service)
  })
})
