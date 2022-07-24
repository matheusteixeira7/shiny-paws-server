import { PetsRepository } from '@application/repositories/PetsRepository'
import { Pet } from '@domain/entities/pet'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById (id: string): Promise<Pet | null> {
    const pet = this.items.find(pet => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async save (pet: Pet): Promise<Pet> {
    this.items.push(pet)

    return pet
  }
}
