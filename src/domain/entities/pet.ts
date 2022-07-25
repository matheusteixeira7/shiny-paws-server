import { Customer } from '@domain/entities/customer'
import { Entity } from '../../core/domain/Entity'

type PetProps = {
  id?: string
  name: string
  specie: 'dog' | 'cat'
  breed: string
  owner: Customer
  createdAt?: Date
  updatedAt?: Date
}

export class Pet extends Entity<PetProps> {
  private constructor (props: PetProps, id?: string) {
    super(props, id)
  }

  static create (props: PetProps, id?: string) {
    const pet = new Pet({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    }, id)

    return pet
  }
}
