import 'reflect-metadata'
import 'module-alias/register'
import 'dotenv/config'
import '@infra/container'
import 'express-async-errors'

import cors from 'cors'
import routes from './routes'
import express, { json } from 'express'

const app = express()
app.use(cors())
app.use(json())
app.use(routes)
app.use((req, res, next) => {
  res.type('json')
  next()
})

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
