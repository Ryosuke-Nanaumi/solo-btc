// import exercise
import { readFile } from "fs/promises";
import path from "path";

export class TrainingRepository {
  async getPersonalInfo() {
    const filePath = path.join(__dirname, "../../mock/personalUser.json");
    const personalUser = await readFile(filePath, "utf-8");
    return JSON.parse(personalUser);
  }
  
  async getRanking() {
    const filePath = path.join(__dirname, "../../mock/ranking.json");
    const ranking = await readFile(filePath, "utf-8");
    return JSON.parse(ranking);
  }
}
