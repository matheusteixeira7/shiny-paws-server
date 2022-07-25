import { PetsRepository } from '@application/repositories/PetsRepository'

type PetProps = {
  id: string
}

export class GetPet {
  constructor (
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
