import { Router } from "express";
import { createContactMessage } from "./contact.controller";

const router = Router();

router.post("/", createContactMessage);

export const contactRoute = router;
