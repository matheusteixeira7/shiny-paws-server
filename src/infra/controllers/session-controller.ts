import { Request, Response } from 'express'
import { CreateSession } from '@application/usecases/users'
import { container } from 'tsyringe'

export class SessionController {
  async create (req: Request, res: Response): Promise<Response> {
    const createSession = container.resolve(CreateSession)
    const session = await createSession.execute({ ...req.body })
    return res.json(session)
  }
}
