import { Router } from 'express'
import { PetsController } from '@infra/controllers/pets-controller'

export const petsRouter = Router()
const petsController = new PetsController()

petsRouter.get('/', petsController.list)
petsRouter.post('/', petsController.create)
petsRouter.post('/:id', petsController.get)
petsRouter.delete('/:id', petsController.delete)
petsRouter.put('/:id', petsController.update)
