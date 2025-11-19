import { TrainingController } from "../TrainingController";
import { TrainingService } from "../../service/TrainingService";

describe("TrainingController", () => {
  let trainingServiceMock: Partial<TrainingService>;
  let controller: TrainingController;
  let req: any;
  let res: any;

  beforeEach(() => {
    trainingServiceMock = {
      getPersonalInfo: vi.fn(),
      getRanking: vi.fn(),
      postTrainingRecords: vi.fn(),
    };

    controller = new TrainingController(trainingServiceMock as TrainingService);

    req = {
      params: {},
      body: {},
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  test("getPersonalInfo returns 200", async () => {
    req.params.id = "1";
    (trainingServiceMock.getPersonalInfo as any).mockResolvedValue({
      id: 123,
      name: "user-name",
      todaysPoint: 100,
      totalPoints: 200,
    });

    await controller.getPersonalInfo(req, res);

    expect(trainingServiceMock.getPersonalInfo).toHaveBeenCalledWith(1);
    expect(trainingServiceMock.getPersonalInfo).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 123,
      name: "user-name",
      todaysPoint: 100,
      totalPoints: 200,
    });
  });

  test("getRanking returns 200", async () => {
    (trainingServiceMock.getRanking as any).mockResolvedValue([
      { id: 2, name: "foo", points: 120 },
      { id: 1, name: "foo2", points: 100 },
      { id: 3, name: "foo3", points: 1 },
    ]);

    await controller.getRanking(req, res);

    expect(trainingServiceMock.getRanking).toHaveBeenCalledWith();
    expect(trainingServiceMock.getRanking).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 2, name: "foo", points: 120 },
      { id: 1, name: "foo2", points: 100 },
      { id: 3, name: "foo3", points: 1 },
    ]);
  });

  test("postTrainingRecords returns 201", async () => {
    req.body = {
      exerciseId: "1",
      date: "2025-01-02T00:00:00.000Z",
      amount: "2",
      id: "3",
    };

    (trainingServiceMock.postTrainingRecords as any).mockResolvedValue({
      id: 1,
      status: "created",
    });

    await controller.postTrainingRecords(req, res);

    expect(trainingServiceMock.postTrainingRecords).toHaveBeenCalledWith({
      exerciseId: 1,
      date: new Date("2025-01-02T00:00:00.000Z"),
      amount: 2,
      id: 3,
    });
    expect(trainingServiceMock.postTrainingRecords).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, status: "created" });

  });
});
