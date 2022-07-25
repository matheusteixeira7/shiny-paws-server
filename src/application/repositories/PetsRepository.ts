import { Pet } from '@domain/entities/pet'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByName(name: string): Promise<Pet | null>
  findOwnerById(ownerId: string): Promise<Pet[]>
  save (pet: Pet): Promise<Pet>
}
