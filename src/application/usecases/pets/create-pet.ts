import { CustomersRepository } from '@application/repositories/CustomersRepository'
import { PetsRepository } from '@application/repositories/PetsRepository'
import { Customer } from '@domain/entities/customer'
import { Pet } from '@domain/entities/pet'

type PetProps = {
  name: string
  specie: 'dog' | 'cat'
  breed: string
  owner: Customer
}

export class CreatePet {
  constructor (
    private petsRepository: PetsRepository,
    private customersRepository: CustomersRepository

  ) {}

  async execute ({ name, specie, breed, owner }: PetProps) {
    const customer = await this.customersRepository.findById(owner.id)

    if (!customer) {
      throw new Error('Customer does not exist.')
    }

    const newPet = Pet.create({
      name,
      specie,
      breed,
      owner
    })

    this.petsRepository.save(newPet)

    return newPet
  }
}
