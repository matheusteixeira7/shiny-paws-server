import { InvalidParamError } from '@application/errors'
import { CustomersRepository } from '@application/repositories'
import { Customer } from '@domain/entities'

export class GetPetOwner {
  constructor (private customersRepository: CustomersRepository) {}

  async execute (ownerId: string): Promise<Customer> {
    const owner = await this.customersRepository.findById(ownerId)

    if (!owner) {
      throw new InvalidParamError('Pet owner not found.')
    }

    return owner
  }
}
