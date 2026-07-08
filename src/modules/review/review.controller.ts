import httpStatus from "http-status";
import { CatchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import { reviewService } from "./review.service";

const createReview = CatchAsync(async (req, res) => {
  const userId = req.user?.id;
  const payload = req.body;
  const result = await reviewService.createReview(userId as string, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
};
