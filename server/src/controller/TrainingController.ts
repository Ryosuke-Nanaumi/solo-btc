import { TrainingService } from "../service/TrainingService";
import { Request, Response } from "express";

export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  getPersonalInfo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const personalUser = await this.trainingService.getPersonalInfo(id);
    res.status(200).json(personalUser);
  };
  
  getRanking = async (req: Request, res: Response) => {
    const ranking = await this.trainingService.getRanking();
    res.status(200).json(ranking);
  }
}
