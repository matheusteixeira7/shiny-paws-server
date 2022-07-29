import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import { ServicesController } from '@infra/controllers/services-controller'

export const servicesRouter = Router()
const servicesController = new ServicesController()

servicesRouter.get('/', servicesController.list)

servicesRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  servicesController.get
)

servicesRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required()
    }
  }),
  servicesController.create
)

servicesRouter.put('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required()
    }
  }),
  servicesController.update
)

servicesRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  servicesController.delete
)
