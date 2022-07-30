import { UsersController } from '@infra/controllers'
import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

export const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.list)

usersRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  usersController.get
)

usersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      oldPassword: Joi.string()
    }
  }),
  usersController.create
)

usersRouter.put('/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required()
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  usersController.update
)

usersRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  usersController.delete
)
