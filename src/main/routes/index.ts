import { Router } from 'express'
import { servicesRouter } from './services.router'
import { sessionRouter } from './session.routes'
import { usersRouter } from './users.routes'

export const routes = Router()

routes.use('/users', usersRouter)
routes.use('/session', sessionRouter)
routes.use('/services', servicesRouter)

export default routes
