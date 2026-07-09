import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";
const router = Router();
router.post("/create", auth(Role.TENANT), paymentController.createPayment);
router.post("/confirm", paymentController.confirmPayment);
router.get("/", auth(Role.TENANT), paymentController.getMyPayments);
router.get("/:id", auth(Role.TENANT), paymentController.getPaymentById);
export const paymentRouter = router;
//# sourceMappingURL=payment.route.js.map