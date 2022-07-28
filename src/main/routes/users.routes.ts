import { UsersController } from '@infra/controllers/users-controller'
import { Router } from 'express'

export const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.list)
usersRouter.get('/:id', usersController.get)
usersRouter.post('/', usersController.create)
usersRouter.put('/:id', usersController.update)
usersRouter.delete('/:id', usersController.delete)
