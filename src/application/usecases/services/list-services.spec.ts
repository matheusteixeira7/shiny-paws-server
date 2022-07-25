import { Service } from '@domain/entities/service'
import { InMemoryServicesRepository } from '@tests/repositories/in-memory-services-repository'
import { ListServices } from './list-services'

describe('List user use case', () => {
  it('should be able to list users', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new ListServices(servicesRepository)

    const service1 = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    const service2 = Service.create({
      name: 'Tosa',
      price: 50
    })

    await servicesRepository.save(service1)
    await servicesRepository.save(service2)

    const services = await sut.execute()

    expect(services).toHaveLength(2)
  })
})
