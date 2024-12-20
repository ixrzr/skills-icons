import express from "express";
import type { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import router from "./routes";

const api: Express = express();

api.use(express.json());
api.use(helmet());
api.use(cors());
api.use(morgan("tiny"));

api.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        status: res.statusCode,
        github: "https://github.com/ixzrz/skills-icons"
    });
});

api.use("/api", router);

api.use((_req: Request, res: Response) => {
    res.status(404).json({
        status: res.statusCode,
        message: "Not Found!",
        hint: "Hmm... There's no such route."
    });
});

api.listen(3000, () => console.log("→ Listening..."));

export default api