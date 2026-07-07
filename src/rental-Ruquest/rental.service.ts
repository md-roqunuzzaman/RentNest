import { prisma } from "../lib/prisma";
import { ICreateRentalRequest } from "./rental.interface";

const createRentalRequest = async (
  userId: string,
  payload: ICreateRentalRequest,
) => {
  const property = await prisma.property.findUniqueOrThrow({
    where: {
      id: payload.propertyId,
    },
  });
  if (!property.availability) {
    throw new Error("property is not available");
  }
  const existingRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId: userId,
      propertyId: payload.propertyId,
    },
  });

  if (existingRequest) {
    throw new Error("You already requested this property");
  }

  const rentalRequest = await prisma.rentalRequest.create({
    data: {
      tenantId: userId,
      propertyId: payload.propertyId,
      moveInDate: new Date(payload.moveInDate),
      months: payload.months,
      message: payload.message,
    },
    include: {
      tenant: true,
      property: {
        include: {
          category: true,
        },
      },
    },
  });
  return rentalRequest;
};

const getMyRentalRequests = async (userId: string) => {
  const rentalRequests = await prisma.rentalRequest.findMany({
    where: {
      tenantId: userId,
    },
    include: {
      property: {
        include: {
          category: true,
          landlord: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rentalRequests;
};
const getRentalRequestById = async (
  userId: string,
  rentalRequestId: string,
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalRequestId,
    },
    include: {
      property: {
        include: {
          category: true,
          landlord: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found");
  }

  if (rentalRequest.tenantId !== userId) {
    throw new Error("You are not authorized to view this rental request");
  }

  return rentalRequest;
};
export const rentalService = {
  createRentalRequest,
  getMyRentalRequests,
  getRentalRequestById,
};
