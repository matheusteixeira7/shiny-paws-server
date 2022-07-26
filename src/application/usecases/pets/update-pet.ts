import { Customer } from '@domain/entities/customer'
import { PetsRepository } from '@application/repositories/PetsRepository'

type PetProps = {
  id: string
  name: string
  specie: 'dog' | 'cat'
  breed: string
  owner: Customer
}

export class UpdatePet {
  constructor (
    private petsRepository: PetsRepository
  ) {}

  async execute ({ id, name, specie, breed, owner }: PetProps) {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new Error('Pet not found.')
    }

    const updatedPet = Object.assign({}, pet, {
      props: {
        ...pet.props,
        name,
        specie,
        breed,
        owner,
        updatedAt: new Date()
      }
    })

    this.petsRepository.save(updatedPet)

    return updatedPet
  }
}
