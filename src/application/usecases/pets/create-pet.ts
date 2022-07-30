import { InvalidParamError } from '@application/errors'
import { CustomersRepository } from '@application/repositories/CustomersRepository'
import { PetsRepository } from '@application/repositories/PetsRepository'
import { Pet } from '@domain/entities/pet'
import { inject, injectable } from 'tsyringe'

type PetPropsRequest = {
  name: string
  specie: 'dog' | 'cat'
  breed: string
  ownerId: string
}

@injectable()
export class CreatePet {
  constructor (
    @inject('InMemoryPetsRepository')
    private petsRepository: PetsRepository,
    @inject('InMemoryCustomersRepository')
    private customersRepository: CustomersRepository

  ) {}

  async execute ({ name, specie, breed, ownerId }: PetPropsRequest) {
    const customer = await this.customersRepository.findById(ownerId)

    if (!customer) {
      throw new InvalidParamError('Customer does not exist.')
    }

    const newPet = Pet.create({
      name,
      specie,
      breed,
      owner: customer
    })

    this.petsRepository.save(newPet)

    return newPet
  }
}
