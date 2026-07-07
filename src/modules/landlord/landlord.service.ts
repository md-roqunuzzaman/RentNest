import { prisma } from "../../lib/prisma";
import { ICreateProperty } from "./landlord.interface";

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
export const landlordService = {
  createProperty,
  updateProperty,
  deleteProperty,
};
