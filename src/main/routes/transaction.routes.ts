import { TransactionsController } from '@infra/controllers'
import { Router } from 'express'

export const transactionsRouter = Router()
const transactionsController = new TransactionsController()

transactionsRouter.get('/', transactionsController.list)

transactionsRouter.post('/', transactionsController.create)

transactionsRouter.get('/:id', transactionsController.get)

transactionsRouter.put('/:id', transactionsController.update)

transactionsRouter.delete('/:id', transactionsController.delete)
