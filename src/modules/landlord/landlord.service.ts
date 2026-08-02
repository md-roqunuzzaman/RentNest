import { RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import {
  ICreateProperty,
  IUpdateRentalRequestStatus,
} from "./landlord.interface";

const createProperty = async (landlordId: string, payload: ICreateProperty) => {
  const Property = await prisma.property.create({
    data: {
      ...payload,
      landlordId: landlordId,
    },
    include: {
      category: true,
      landlord: {
        omit: {
          password: true,
        },
      },
    },
  });
  return Property;
};

const updateProperty = async (
  userId: string,
  propertyId: string,
  payload: any,
) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.landlordId !== userId) {
    throw new Error("You are not authorized to update this property");
  }

  const updatedProperty = await prisma.property.update({
    where: { id: propertyId },
    data: payload,
  });

  return updatedProperty;
};

const deleteProperty = async (userId: string, propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.landlordId !== userId) {
    throw new Error("You are not authorized to delete this property");
  }

  await prisma.property.delete({
    where: {
      id: propertyId,
    },
  });

  return null;
};
const getRentalRequests = async (userId: string) => {
  const requests = await prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId: userId,
      },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return requests;
};

const updateRentalRequestStatus = async (
  userId: string,
  requestId: string,
  payload: IUpdateRentalRequestStatus,
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: requestId,
    },
    include: {
      property: true,
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found");
  }

  if (rentalRequest.property.landlordId !== userId) {
    throw new Error("You are not authorized to update this rental request");
  }

  // already processed
  if (rentalRequest.status !== RentalStatus.PENDING) {
    throw new Error("Rental request has already been processed");
  }

  // only approved and rejected status allow
  if (
    payload.status !== RentalStatus.APPROVED &&
    payload.status !== RentalStatus.REJECTED
  ) {
    throw new Error("Invalid rental request status");
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedRequest = await tx.rentalRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status: payload.status,
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

    // If  status approved, property  becomes unavailable
    if (payload.status === RentalStatus.APPROVED) {
      await tx.property.update({
        where: {
          id: rentalRequest.propertyId,
        },
        data: {
          availability: false,
        },
      });

      // reject all other pending requests for the same property
      await tx.rentalRequest.updateMany({
        where: {
          propertyId: rentalRequest.propertyId,
          id: {
            not: requestId,
          },
          status: RentalStatus.PENDING,
        },
        data: {
          status: RentalStatus.REJECTED,
        },
      });
    }

    return updatedRequest;
  });

  return result;
};

const getMyProperties = async (landlordId: string) => {
  const properties = await prisma.property.findMany({
    where: {
      landlordId,
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return properties;
};
export const landlordService = {
  createProperty,
  updateProperty,
  deleteProperty,
  getRentalRequests,
  updateRentalRequestStatus,
  getMyProperties,
};
