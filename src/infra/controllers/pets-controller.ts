
import { CreatePet } from '@application/usecases/pets/create-pet'
import { ListPets } from '@application/usecases/pets/list-pets'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class PetsController {
  async list (req: Request, res: Response): Promise<Response> {
    const listPets = container.resolve(ListPets)
    const pets = await listPets.execute()
    return res.json(pets)
  }

  async create (req: Request, res: Response): Promise<Response> {
    const createPet = container.resolve(CreatePet)
    const pet = await createPet.execute({ ...req.body })
    return res.json(pet)
  }
}
