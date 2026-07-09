import {
  PaymentStatus,
  RentalStatus,
  UserStatus,
} from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IUpdateUserStatus } from "./admin.interface";

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};

const updateUserStatus = async (userId: string, payload: IUpdateUserStatus) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (
    payload.status !== UserStatus.ACTIVE &&
    payload.status !== UserStatus.BLOCKED
  ) {
    throw new Error("Invalid user status");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      status: payload.status,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

const getAllProperties = async () => {
  const properties = await prisma.property.findMany({
    include: {
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      category: true,

      rentalRequest: {
        select: {
          id: true,
          status: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return properties;
};

const getStats = async () => {
  const [
    totalUsers,
    totalProperties,
    availableProperties,
    totalRentalRequests,
    activeRentals,
    totalRevenue,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.property.count(),

    prisma.property.count({
      where: {
        availability: true,
      },
    }),

    prisma.rentalRequest.count(),

    prisma.rentalRequest.count({
      where: {
        status: RentalStatus.ACTIVE,
      },
    }),

    prisma.payment.aggregate({
      where: {
        status: PaymentStatus.COMPLETED,
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    totalUsers,
    totalProperties,
    availableProperties,
    totalRentalRequests,
    activeRentals,
    totalRevenue: totalRevenue._sum.amount || 0,
  };
};

const getAllRentals = async () => {
  const rentals = await prisma.rentalRequest.findMany({
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      property: {
        select: {
          id: true,
          title: true,
          rent: true,
          city: true,
          address: true,
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

  return rentals;
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getStats,
  getAllRentals,
};
