import { Router } from 'express'
import { PetsController } from '@infra/controllers/pets-controller'

export const petsRouter = Router()
const petsController = new PetsController()

petsRouter.get('/', petsController.list)
