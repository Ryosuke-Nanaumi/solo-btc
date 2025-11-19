import { TrainingRepository } from "../../repository/TrainingRepository";
import { TrainingService } from "../TrainingService";

describe("TrainingService", () => {
  let trainingRepostioryMock: Partial<TrainingRepository>;
  let trainingService: TrainingService;
  let date = new Date("2025-01-02T00:00:00.000Z");

  beforeEach(() => {
    trainingRepostioryMock = {
      getUserById: vi.fn(),
      getPoint: vi.fn(),
      getRanking: vi.fn(),
      postTrainingRecords: vi.fn(),
    };

    trainingService = new TrainingService(
      trainingRepostioryMock as TrainingRepository,
      date
    );
  });
  test("getPersonalInfo returns PersonalUserInfo when user exists", async () => {
    const userId = 1;
    (trainingRepostioryMock.getUserById as any).mockResolvedValue({
      id: userId,
      name: "string",
    });

    (trainingRepostioryMock.getPoint as any).mockImplementation(
      (userId: number, date?: Date) => {
        if (userId === 1 && !date) {
          return Promise.resolve([
            { amount: 10, point: 20 },
            { amount: 10, point: 10 },
          ]);
        } else if (userId === 1 && date) {
          return Promise.resolve([{ amount: 10, point: 20 }]);
        }
        throw Error();
      }
    );

    const expected = {
      id: userId,
      name: "string",
      todaysPoint: 200,
      totalPoints: 300,
    };

    const actual = await trainingService.getPersonalInfo(userId);

    expect(trainingRepostioryMock.getUserById).toHaveBeenCalledOnce();
    expect(trainingRepostioryMock.getUserById).toHaveBeenCalledWith(userId);
    expect(trainingRepostioryMock.getPoint).toHaveBeenCalledTimes(2);
    expect(actual).to.deep.equal(expected);
  });

  test("getPersonalInfo doesnt returns PersonalUserInfo when user not exists", async () => {
    const userId = 100;
    (trainingRepostioryMock.getUserById as any).mockResolvedValue(undefined);

    await expect(trainingService.getPersonalInfo(userId)).rejects.toThrow(
      "user not found."
    );

    expect(trainingRepostioryMock.getUserById).toHaveBeenCalledOnce();
    expect(trainingRepostioryMock.getUserById).toHaveBeenCalledWith(userId);
    expect(trainingRepostioryMock.getPoint).not.toHaveBeenCalledOnce();
  });

  test("getRanking returns Ranking", async () => {
    (trainingRepostioryMock.getRanking as any).mockResolvedValue([
      { id: 1, name: "foo", points: 10 },
      { id: 2, name: "hoge", points: 9 },
      { id: 3, name: "bar", points: 8 },
    ]);

    const expected = {
      users: [
        { id: 1, name: "foo", points: 10 },
        { id: 2, name: "hoge", points: 9 },
        { id: 3, name: "bar", points: 8 },
      ],
    };
    const actual = await trainingService.getRanking();

    expect(trainingRepostioryMock.getRanking).toHaveBeenCalledOnce();
    expect(trainingRepostioryMock.getRanking).toHaveBeenCalledWith();
    expect(actual).to.deep.equal(expected);
  });

  test("postTrainingRecords returns object", async () => {
    const trainigRecords = {
      exerciseId: 1,
      date: new Date("2025-01-02T00:00:00.000Z"),
      amount: 2,
      id: 3,
    };

    (trainingRepostioryMock.postTrainingRecords as any).mockResolvedValue([
      {
        id: 5,
      },
    ]);

    const expected = { id: 5, status: "created" };
    const actual = await trainingService.postTrainingRecords(trainigRecords);

    expect(trainingRepostioryMock.postTrainingRecords).toHaveBeenCalledOnce();
    expect(trainingRepostioryMock.postTrainingRecords).toHaveBeenCalledWith(
      trainigRecords
    );
    expect(actual).to.deep.equal(expected);
  });
});
