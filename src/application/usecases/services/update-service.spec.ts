import { Service } from '@domain/entities/service'
import { InMemoryServicesRepository } from '@tests/repositories/in-memory-services-repository'
import { UpdateService } from './update-service'

describe('Update user use case', () => {
  it('should throw error if user not found exists', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new UpdateService(servicesRepository)

    await expect(sut.execute({
      id: '1',
      name: 'Banho e tosa',
      price: 130
    })).rejects.toThrowError('Service not found.')
  })

  it('should be able to update a user', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new UpdateService(servicesRepository)

    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.save(service)

    await sut.execute({
      id: service.id,
      name: 'Tosa',
      price: 60
    })

    expect(service).toBeInstanceOf(Service)
  })
})
