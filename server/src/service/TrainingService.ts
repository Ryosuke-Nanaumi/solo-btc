import { TrainingRepository } from "../repository/TrainingRepository";

export class TrainingService {
  constructor(private readonly trainingRepository: TrainingRepository) {}

  async getPersonalInfo() {
    return this.trainingRepository.getPersonalInfo();
  }
}
