import { PetsRepository } from '@application/repositories/PetsRepository'
import { inject, injectable } from 'tsyringe'

type PetProps = {
  id: string
}

@injectable()
export class GetPet {
  constructor (
    @inject('InMemoryPetsRepository')
    private petsRepository: PetsRepository
  ) {}

  async execute ({ id }: PetProps) {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new Error('Pet not found.')
    }

    return pet
  }
}
