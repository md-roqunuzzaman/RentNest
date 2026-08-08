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

    // Chart data
    usersByRole,
    propertiesByCategory,
    rentalRequestsByStatus,
  ] = await Promise.all([
    // =========================
    // Overview Stats
    // =========================

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

    // =========================
    // Users By Role
    // =========================

    prisma.user.groupBy({
      by: ["role"],
      _count: {
        _all: true,
      },
    }),

    // =========================
    // Properties By Category
    // =========================

    prisma.property.groupBy({
      by: ["categoryId"],
      _count: {
        _all: true,
      },
    }),

    // =========================
    // Rental Requests By Status
    // =========================

    prisma.rentalRequest.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),
  ]);

  // Get category names
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  return {
    // =========================
    // Overview
    // =========================

    totalUsers,

    totalProperties,

    availableProperties,

    totalRentalRequests,

    activeRentals,

    totalRevenue: totalRevenue._sum.amount || 0,

    // =========================
    // Chart Data
    // =========================

    usersByRole: usersByRole.map((item) => ({
      role: item.role,
      count: item._count._all,
    })),

    propertiesByCategory: propertiesByCategory.map((item) => ({
      category: categoryMap.get(item.categoryId) ?? "Unknown",
      count: item._count._all,
    })),

    rentalRequestsByStatus: rentalRequestsByStatus.map((item) => ({
      status: item.status,
      count: item._count._all,
    })),
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

const getAdminAnalytics = async () => {
  const totalUsers = await prisma.user.count();

  const totalProperties = await prisma.property.count();

  const totalRequests = await prisma.rentalRequest.count();

  // Active rental revenue

  const activeRentals = await prisma.rentalRequest.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      property: true,
    },
  });

  const revenue = activeRentals.reduce(
    (sum, item) => sum + item.property.rent,
    0,
  );

  // User Growth

  const users = await prisma.user.findMany({
    select: {
      createdAt: true,
    },
  });

  const userGrowth: any = {};

  users.forEach((user) => {
    const month = new Date(user.createdAt).toLocaleString("en-US", {
      month: "short",
    });

    userGrowth[month] = (userGrowth[month] || 0) + 1;
  });

  const userGrowthData = Object.entries(userGrowth).map(([month, users]) => ({
    month,
    users,
  }));

  // Property Category Stats

  const categories = await prisma.category.findMany({
    include: {
      properties: true,
    },
  });

  const propertyStats = categories.map((category) => ({
    category: category.name,

    count: category.properties.length,
  }));

  // Rental Request Status

  const statuses = await prisma.rentalRequest.groupBy({
    by: ["status"],

    _count: {
      id: true,
    },
  });

  const requestStatus = statuses.map((item) => ({
    status: item.status,

    count: item._count.id,
  }));

  return {
    totalUsers,

    totalProperties,

    totalRequests,

    revenue,

    userGrowth: userGrowthData,

    propertyStats,

    requestStatus,
  };
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getStats,
  getAllRentals,
  getAdminAnalytics,
};
