import { Express } from "express";
import { TrainingController } from "../controller/TrainingController";
import { TrainingService } from "../service/TrainingService";
import { TrainingRepository } from "../repository/TrainingRepository";

export function registerUserRoute(app: Express) {
  const trainingRepository = new TrainingRepository();
  const trainingService = new TrainingService(trainingRepository);
  const trainingController = new TrainingController(trainingService);

  app.get("/api/personal", trainingController.getPersonalInfo);
  // TODO
  app.get("/api/ranking", trainingController.getRanking);
}
