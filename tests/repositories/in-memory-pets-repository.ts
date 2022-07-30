import { PetsRepository } from '@application/repositories'
import { Pet } from '@domain/entities'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById (id: string): Promise<Pet | null> {
    const pet = this.items.find(pet => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findOwnerById (ownerId: string): Promise<Pet[]> {
    return this.items.filter(pet => pet.props.owner.id === ownerId)
  }

  async findByName (name: string): Promise<Pet | null> {
    const pet = this.items.find(pet => pet.props.name === name)

    if (!pet) {
      return null
    }

    return pet
  }

  async save (pet: Pet): Promise<Pet> {
    const findIndex = this.items.findIndex(p => p.id === pet.id)

    if (findIndex === -1) {
      this.items.push(pet)
    }

    if (findIndex !== -1) {
      this.items[findIndex] = pet
    }

    return pet
  }

  async delete (id: string): Promise<void> {
    const index = this.items.findIndex(pet => pet.id === id)

    if (index === -1) {
      throw new Error('Service not found.')
    }

    this.items.splice(index, 1)
  }

  async list (): Promise<Pet[]> {
    return this.items
  }
}
