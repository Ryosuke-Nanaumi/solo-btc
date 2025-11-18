import express from "express";
import { registerRoutes } from "./route";

export function createApp() {
    const app = express();

    app.use(express.json());
    registerRoutes(app);
    
    return app;
}