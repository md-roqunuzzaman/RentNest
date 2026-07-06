import { Router } from "express";
import { categoryController } from "./categories.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post("/", auth(Role.ADMIN), categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.patch(
  "/:categoryId",
  auth(Role.ADMIN),
  categoryController.updateCategory,
);
router.delete(
  "/:categoryId",
  auth(Role.ADMIN),
  categoryController.deleteCategory,
);
export const categoryRouter = router;
