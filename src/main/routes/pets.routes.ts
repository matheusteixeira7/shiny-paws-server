import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { PetsController } from '@infra/controllers'

export const petsRouter = Router()
const petsController = new PetsController()

petsRouter.get('/', petsController.list)

petsRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      specie: Joi.string().required(),
      breed: Joi.string().required(),
      ownerId: Joi.string().required()
    }
  }),
  petsController.create
)

petsRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  petsController.get
)

petsRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  petsController.delete
)

petsRouter.put('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      specie: Joi.string().required(),
      breed: Joi.string().required(),
      ownerId: Joi.string().required()
    }
  }),
  petsController.update
)
