import { Service } from '@domain/entities/service'
import { InMemoryServicesRepository } from '@tests/repositories/in-memory-services-repository'
import { UpdateService } from './update-service'

describe('Update service use case', () => {
  it('should throw error if service not found exists', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new UpdateService(servicesRepository)

    await expect(sut.execute({
      id: '1',
      name: 'Banho e tosa',
      price: 130
    })).rejects.toThrowError('Service not found.')
  })

  it('should be able to update services name', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new UpdateService(servicesRepository)

    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.save(service)

    const updatedService = Object.assign({}, service, {
      props: {
        ...service.props,
        name: 'Tosa',
        price: 60
      }
    })

    const result = await sut.execute({
      id: service.id,
      name: 'Tosa',
      price: 60
    })

    expect(result.props.name).toEqual(updatedService.props.name)
  })

  it('should be able to update services price', async () => {
    const servicesRepository = new InMemoryServicesRepository()
    const sut = new UpdateService(servicesRepository)

    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.save(service)

    const updatedService = Object.assign({}, service, {
      props: {
        ...service.props,
        name: 'Tosa',
        price: 60
      }
    })

    const result = await sut.execute({
      id: service.id,
      name: 'Tosa',
      price: 60
    })

    expect(result.props.price).toEqual(updatedService.props.price)
  })
})
