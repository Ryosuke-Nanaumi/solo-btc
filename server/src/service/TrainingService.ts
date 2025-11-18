import { TrainingRepository } from "../repository/TrainingRepository";

interface PersonalUserInfo {
  id: number;
  name: string;
  todaysPoint: number;
  totalPoints: number;
}
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly date = new Date()
  ) {}

  async getPersonalInfo(): Promise<PersonalUserInfo> {
    const user = await this.trainingRepository.getUserById();

    if (!user) throw Error("user not found.");

    const [totalPoint, todaysPoint] = await Promise.all([
      this.trainingRepository.getTotalPoint(user.id, this.date),
      this.trainingRepository.getTodaysPoint(user.id, this.date),
    ]);

    return {
      ...user,
      todaysPoint: todaysPoint,
      totalPoints: totalPoint,
    };
  }

  async getRanking() {
    return this.trainingRepository.getRanking();
  }
}
