import { Request, Response } from 'express'
import { ListUsers } from '@application/usecases/users/list-users'
import { CreateUser } from '@application/usecases/users/create-user'
import { container } from 'tsyringe'

export class UsersController {
  async list (req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsers)
    const users = await listUsers.execute()

    return res.json(users)
  }

  async create (req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUser)

    const user = await createUser.execute(req.body)

    return res.status(201).json(user)
  }
}
