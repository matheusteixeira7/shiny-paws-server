import { Entity } from '../../core/domain/Entity'

type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  private constructor (props: UserProps, id?: string) {
    super(props, id)
  }

  static create (props: UserProps, id?: string) {
    const user = new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    }, id)

    return user
  }
}
