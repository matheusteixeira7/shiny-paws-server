import { Service } from '@domain/entities/service'
import { InMemoryServicesRepository } from '@tests/repositories/in-memory-services-repository'
import { GetService } from './get-service'

describe('Get service use case', () => {
  it('should throw error if service do not exists', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new GetService(servicesRepository)

    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Service not found.')
  })

  it('should be able to get a service', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new GetService(servicesRepository)

    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.save(service)

    const result = await sut.execute({
      id: service.id
    })

    expect(result).toEqual(service)
  })
})
