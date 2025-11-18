import { TrainingService } from "../service/TrainingService";
import { Request, Response } from "express";

export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  getPersonalInfo = async (req: Request, res: Response) => {
    const personalUser = await this.trainingService.getPersonalInfo();
    res.status(200).json(personalUser);
  };
  // TODO
  getRanking() {}
}
