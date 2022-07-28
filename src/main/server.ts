import 'reflect-metadata'
import 'module-alias/register'
import 'dotenv/config'
import '@infra/container'

import cors from 'cors'
import routes from './routes'
import express from 'express'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
