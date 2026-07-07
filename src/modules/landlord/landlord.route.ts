import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post("/", auth(Role.LANDLORD), landlordController.createProperty);
router.put("/:id", auth(Role.LANDLORD), landlordController.updateProperty);
router.delete("/:id", auth(Role.LANDLORD), landlordController.deleteProperty);
export const landlordRouter = router;
