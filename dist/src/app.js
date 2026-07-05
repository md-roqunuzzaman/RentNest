import express from "express";
import config from "./config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/auth/auth.route";
const app = express();
app.use(cors({
    origin: config.app_url,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
    res.send("hello home");
});
export default app;
//# sourceMappingURL=app.js.map