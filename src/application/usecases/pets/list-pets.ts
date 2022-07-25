import { PetsRepository } from '@application/repositories/PetsRepository'

export class ListPets {
  constructor (
    private petsRepository: PetsRepository
  ) {}

  async execute () {
    return this.petsRepository.list()
  }
}
