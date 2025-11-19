import { TrainingRepository } from "../repository/TrainingRepository";
import { Ranking } from "../repository/TrainingRepository";

interface PersonalUserInfo {
  id: number;
  name: string;
  todaysPoint: number;
  totalPoints: number;
}
export interface TrainingRecords {
  exerciseId: number;
  date: Date;
  amount: number;
  id: number;
}
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly date = new Date()
  ) {}

  async getPersonalInfo(userId: number): Promise<PersonalUserInfo> {
    const user = await this.trainingRepository.getUserById(userId);

    if (!user) throw Error("user not found.");

    const [totalRecords, todaysRecords] = await Promise.all([
      this.trainingRepository.getPoint(user.id),
      this.trainingRepository.getPoint(user.id, this.date),
    ]);

    const totalPoint = this.calcPoint(totalRecords);
    const todaysPoint = this.calcPoint(todaysRecords);

    return {
      ...user,
      todaysPoint: todaysPoint,
      totalPoints: totalPoint,
    };
  }
  calcPoint(target: { amount: number; point: number }[]): number {
    return target.reduce((acc, cur) => acc + cur.amount * cur.point, 0);
  }

  async getRanking(): Promise<{ users: Ranking[] }> {
    return { users: await this.trainingRepository.getRanking() };
  }

  async postTrainingRecords(
    trainigRecords: TrainingRecords
  ): Promise<{ id: number; status: string }> {
    const [result] = await this.trainingRepository.postTrainingRecords(
      trainigRecords
    );
    return { id: result.id, status: "created" };
  }
}
