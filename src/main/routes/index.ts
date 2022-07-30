import { Router } from 'express'
import { petsRouter } from './pets.routes'
import { servicesRouter } from './services.router'
import { sessionRouter } from './session.routes'
import { usersRouter } from './users.routes'

export const routes = Router()

routes.use('/users', usersRouter)
routes.use('/session', sessionRouter)
routes.use('/services', servicesRouter)
routes.use('/pets', petsRouter)

export default routes
