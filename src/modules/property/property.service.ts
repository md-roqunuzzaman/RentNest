import { Prisma } from "../../../generated/prisma/client";

import { prisma } from "../../lib/prisma";

interface IPropertyQuery {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: "rent" | "createdAt";
  sortOrder?: "asc" | "desc";
  location?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  amenities?: string;
}

const getAllProperties = async (query: IPropertyQuery) => {
  const limit = query.limit ? Number(query.limit) : 12;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy =
    query.sortBy === "rent" || query.sortBy === "createdAt"
      ? query.sortBy
      : "createdAt";

  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";
  const andConditions: Prisma.PropertyWhereInput[] = [];
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

  if (query.location) {
    andConditions.push({
      city: {
        contains: query.location,
        mode: "insensitive",
      },
    });
  }

  //
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
  if (query.amenities) {
    andConditions.push({
      amenities: {
        has: query.amenities,
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
//  const getRelatedProperties = async (propertyId: string) => {
//   const property = await prisma.property.findUnique({
//     where: {
//       id: propertyId,
//     },
//   });

//   if (!property) {
//     throw new Error("Property not found");
//   }

const getRelatedProperties = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  const relatedProperties = await prisma.property.findMany({
    where: {
      id: {
        not: propertyId,
      },

      OR: [
        // Same category
        {
          categoryId: property.categoryId,
        },

        // Same city
        {
          city: {
            equals: property.city,
            mode: "insensitive",
          },
        },

        // Similar price range
        {
          rent: {
            gte: Math.max(property.rent - 20000, 0),
            lte: property.rent + 20000,
          },
        },
      ],
    },

    take: 6,

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

  return relatedProperties;
};

export const propertyService = {
  getAllProperties,
  getPropertyById,
  getAllCategories,
  getRelatedProperties,
};
