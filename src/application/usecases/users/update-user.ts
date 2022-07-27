import { UsersRepository } from '@application/repositories/UsersRepository'
import { HashHandler } from '@infra/gateways/hash-handler'

type UserProps = {
  id: string
  name: string
  email: string
  password?: string
  oldPassword?: string
}

export class UpdateUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute ({ id, name, email, password, oldPassword }: UserProps) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new Error('User not found.')
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email)

    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new Error('Email already in use')
    }

    if (password && !oldPassword) {
      throw new Error('Old password is required')
    }

    if (password && oldPassword) {
      const checkOldPassword = await new HashHandler().compare(oldPassword, user.props.password)

      if (!checkOldPassword) {
        throw new Error('Old password does not match')
      }

      user.props.password = await new HashHandler().generate(password)
    }

    Object.assign(user, {
      props: {
        ...user.props,
        name,
        email,
        password,
        updatedAt: new Date()
      }
    })

    this.usersRepository.save(user)

    return user
  }
}
