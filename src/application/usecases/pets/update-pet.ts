import { InvalidParamError } from '@application/errors'
import { PetsRepository, CustomersRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type PetProps = {
  id: string
  name: string
  specie: 'dog' | 'cat'
  breed: string
  ownerId: string
}

@injectable()
export class UpdatePet {
  constructor (
    @inject('InMemoryPetsRepository')
    private petsRepository: PetsRepository,
    @inject('InMemoryCustomersRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute ({ id, name, specie, breed, ownerId }: PetProps) {
    const petOwner = await this.customersRepository.findById(ownerId)

    if (!petOwner) {
      throw new InvalidParamError('Owner not found')
    }

    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new InvalidParamError('Pet not found.')
    }

    Object.assign(pet, {
      props: {
        ...pet.props,
        name,
        specie,
        breed,
        ownerId: petOwner.id,
        updatedAt: new Date()
      }
    })

    this.petsRepository.save(pet)

    return pet
  }
}
