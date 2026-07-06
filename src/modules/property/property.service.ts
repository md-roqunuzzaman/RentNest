import { PropertyWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { ICreateProperty } from "./property.interface";

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
interface IPropertyQuery extends PropertyWhereInput {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  location?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
}

const getAllProperties = async (query: IPropertyQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions: PropertyWhereInput[] = [];
  // Search by title, city, address
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          address: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: query.searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  // 📍 LOCATION FILTER
  if (query.location) {
    andConditions.push({
      city: {
        contains: query.location,
        mode: "insensitive",
      },
    });
  }

  // 🏷️ TYPE FILTER (CATEGORY)
  if (query.type) {
    andConditions.push({
      category: {
        name: {
          equals: query.type,
          mode: "insensitive",
        },
      },
    });
  }

  // price filter
  if (query.minPrice || query.maxPrice) {
    andConditions.push({
      rent: {
        ...(query.minPrice && { gte: Number(query.minPrice) }),
        ...(query.maxPrice && { lte: Number(query.maxPrice) }),
      },
    });
  }

  const properties = await prisma.property.findMany({
    where: {
      AND: andConditions,
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
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.property.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: properties,
  };
};

const getPropertyById = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
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
  });

  if (!property) {
    throw new Error("Property not found");
  }

  return property;
};
const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};
export const propertyService = {
  createProperty,
  getAllProperties,
  getPropertyById,
  getAllCategories,
};
