import { Router } from 'express'
import { CustomersController } from '@infra/controllers'

export const customersRouter = Router()
const customersController = new CustomersController()

customersRouter.get('/', customersController.list)

customersRouter.post('/', customersController.create)
