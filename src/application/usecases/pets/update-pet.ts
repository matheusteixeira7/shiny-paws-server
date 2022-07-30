import { PetsRepository } from '@application/repositories/PetsRepository'
import { inject, injectable } from 'tsyringe'
import { CustomersRepository } from '@application/repositories/CustomersRepository'

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
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new Error('Pet not found.')
    }

    Object.assign(pet, {
      props: {
        ...pet.props,
        name,
        specie,
        breed,
        owner: petOwner,
        updatedAt: new Date()
      }
    })

    this.petsRepository.save(pet)

    return pet
  }
}
