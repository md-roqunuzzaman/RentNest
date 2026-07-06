import { Router } from "express";
import { propertyController } from "./property.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";

const router = Router();
router.post("/", auth(Role.LANDLORD), propertyController.createProperty);
router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);
export const propertyRouter = router;
