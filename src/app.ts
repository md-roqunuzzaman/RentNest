import express, { Application, Request, Response } from "express";
import config from "./config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/auth/auth.route";
import { propertyRouter } from "./modules/property/property.route";
import { categoryRouter } from "./modules/categories/categories.route";
import { auth } from "./middleware/auth";
import { Role } from "../generated/prisma/enums";
import { landlordRouter } from "./modules/landlord/landlord.route";
import { rentalRouter } from "./rental-Ruquest/rental.route";

const app: Application = express();
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/landlord/properties", landlordRouter);
app.use("/api/rentals", rentalRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("hello home");
});
export default app;
