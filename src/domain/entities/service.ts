import { Entity } from '../../core/domain/Entity'

type ServiceProps = {
  name: string
  price: string
  createdAt?: Date
  updatedAt?: Date
}

export class Service extends Entity<ServiceProps> {
  private constructor (props: ServiceProps, id?: string) {
    super(props, id)
  }

  static create (props: ServiceProps, id?: string) {
    const service = new Service({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    }, id)

    return service
  }
}
