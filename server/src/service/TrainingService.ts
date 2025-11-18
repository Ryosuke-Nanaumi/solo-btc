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

  async getRanking() {
    return this.trainingRepository.getRanking();
  }
}
