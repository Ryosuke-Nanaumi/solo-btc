import express from "express";
import { registerRoutes } from "./route";
import cors from "cors";

export function createApp() {
    const app = express();

    app.use(cors({
        origin: "http://localhost:5173"
    }))
    app.use(express.json());
    registerRoutes(app);
    
    return app;
}