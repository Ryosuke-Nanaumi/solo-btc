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
  };

  postTrainingRecords = async (req: Request, res: Response) => {
    const records = req.body;

    const result = await this.trainingService.postTrainingRecords({
      exerciseId: Number(records.exerciseId),
      date: new Date(records.date),
      amount: Number(records.amount),
      id: Number(records.id),
    });

    res.status(201).json(result);
  };
}
