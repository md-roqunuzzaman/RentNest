import { Router } from "express";
import { propertyController } from "./property.controller";

import { categoryController } from "../categories/categories.controller";

const router = Router();

router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);
router.get("/", categoryController.getAllCategories);
router.get("/:id/related", propertyController.getRelatedProperties);
export const propertyRouter = router;
