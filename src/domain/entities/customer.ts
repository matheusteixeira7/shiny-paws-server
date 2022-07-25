import { Entity } from '../../core/domain/Entity'

type CustomerProps = {
  name: string
  email: string
  phone: string
  address: string
  createdAt?: Date
  updatedAt?: Date
}

export class Customer extends Entity<CustomerProps> {
  private constructor (props: CustomerProps, id?: string) {
    super(props, id)
  }

  static create (props: CustomerProps, id?: string) {
    const customer = new Customer({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.createdAt ?? new Date()
    }, id)

    return customer
  }
}
