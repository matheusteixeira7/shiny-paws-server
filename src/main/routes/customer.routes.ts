import { Router } from 'express'
import { CustomersController } from '@infra/controllers'
import { celebrate, Joi, Segments } from 'celebrate'

export const customersRouter = Router()
const customersController = new CustomersController()

customersRouter.get('/', customersController.list)

customersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required()
    }
  }),
  customersController.create
)

customersRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customersController.delete
)
customersRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customersController.get
)

customersRouter.put('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required()
    }
  }),
  customersController.update
)
