import { RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./review.interface";

const createReview = async (userId: string, payload: ICreateReview) => {
  // rating validation
  if (!payload.rating || payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  if (!payload.comment || payload.comment.trim().length === 0) {
    throw new Error("Comment is required");
  }

  // check rental request
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: payload.rentalRequestId,
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found");
  }

  // only owner tenant allow for  review
  if (rentalRequest.tenantId !== userId) {
    throw new Error("You are not authorized to review this property");
  }

  // only after payment completed tenant can review
  if (rentalRequest.status !== RentalStatus.ACTIVE) {
    throw new Error("You can review only after completing rental payment");
  }

  // prevent duplicate review ,only review once
  const existingReview = await prisma.review.findUnique({
    where: {
      rentalRequestId: payload.rentalRequestId,
    },
  });

  if (existingReview) {
    throw new Error("You already reviewed this property");
  }

  const review = await prisma.review.create({
    data: {
      tenantId: userId,
      propertyId: rentalRequest.propertyId,
      rentalRequestId: payload.rentalRequestId,
      rating: payload.rating,
      comment: payload.comment,
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      property: {
        include: {
          category: true,
        },
      },
    },
  });

  return review;
};
const getTestimonials = async () => {
  const reviews = await prisma.review.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tenant: {
        select: {
          name: true,
        },
      },
      property: {
        select: {
          title: true,
        },
      },
    },
  });

  return reviews;
};

export const reviewService = {
  createReview,
  getTestimonials,
};
