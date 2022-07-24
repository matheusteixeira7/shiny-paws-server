import { Pet } from '@domain/entities/pet'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  save (pet: Pet): Promise<Pet>
}
