import { Request, Response } from "express";

import { contactValidationSchema } from "./contact.validation";
import { contactService } from "./controller.service";

export const createContactMessage = async (req: Request, res: Response) => {
  try {
    const data = contactValidationSchema.parse(req.body);

    const result = await contactService.createContactMessage(data);

    res.status(201).json({
      success: true,

      message: "Contact message submitted successfully",

      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: "Invalid contact data",

      error,
    });
  }
};
