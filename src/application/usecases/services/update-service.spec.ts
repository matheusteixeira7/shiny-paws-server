import { Service } from '@domain/entities'
import { InMemoryServicesRepository } from '@tests/repositories'
import { UpdateService } from './update-service'

let servicesRepository: InMemoryServicesRepository
let sut: UpdateService

describe('Update service use case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new UpdateService(servicesRepository)
  })
  it('should throw error if service not found exists', async () => {
    await expect(sut.execute({
      id: '1',
      name: 'Banho e tosa',
      price: 130
    })).rejects.toThrowError('Service not found.')
  })

  it('should be able to update services name', async () => {
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
