import { Express } from "express";
import { registerUserRoute } from "./trainingRoute";

export function registerRoutes(app: Express) {
  registerUserRoute(app);
}
