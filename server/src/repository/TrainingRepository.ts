// import exercise
import { readFile } from "fs/promises";
import path from "path";

export class TrainingRepository {
  async getPersonalInfo() {
    const filePath = path.join(__dirname, "../../mock/personalUser.json");
    // console.log("foo----------", filePath);
    const personalUser = await readFile(filePath, "utf-8");
    return JSON.parse(personalUser);
  }
}
