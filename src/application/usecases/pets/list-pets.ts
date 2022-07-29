import { PetsRepository } from '@application/repositories/PetsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListPets {
  constructor (
    @inject('InMemoryPetsRepository')
    private petsRepository: PetsRepository
  ) {}

  async execute () {
    return this.petsRepository.list()
  }
}
