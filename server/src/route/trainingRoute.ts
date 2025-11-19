import { Express } from "express";
import { TrainingController } from "../controller/TrainingController";
import { TrainingService } from "../service/TrainingService";
import { TrainingRepository } from "../repository/TrainingRepository";

export function registerUserRoute(app: Express) {
  const trainingRepository = new TrainingRepository();
  const trainingService = new TrainingService(trainingRepository);
  const trainingController = new TrainingController(trainingService);

  app.get("/api/personal/:id", trainingController.getPersonalInfo);
  app.get("/api/ranking", trainingController.getRanking);
  app.post("/api/training_records", trainingController.postTrainingRecords);
}
