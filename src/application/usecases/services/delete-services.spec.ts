import { Service } from '@domain/entities/service'
import { InMemoryServicesRepository } from '@tests/repositories/in-memory-services-repository'
import { DeleteService } from './delete-services'

describe('Delete service use case', () => {
  it('should throw error if service not found exists', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new DeleteService(servicesRepository)

    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Service not found.')
  })

  it('should be able to delete a service', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new DeleteService(servicesRepository)

    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.save(service)

    await sut.execute({
      id: service.id
    })

    expect(servicesRepository.items).toHaveLength(0)
  })
})
