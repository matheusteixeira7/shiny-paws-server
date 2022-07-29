import { Customer } from '@domain/entities/customer'
import { PetsRepository } from '@application/repositories/PetsRepository'
import { inject, injectable } from 'tsyringe'

type PetProps = {
  id: string
  name: string
  specie: 'dog' | 'cat'
  breed: string
  owner: Customer
}

@injectable()
export class UpdatePet {
  constructor (
    @inject('InMemoryPetsRepository')
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
