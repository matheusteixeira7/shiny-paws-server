import { UsersController } from '@infra/controllers/users-controller'
import { Router } from 'express'

export const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.list)
usersRouter.post('/', usersController.create)
