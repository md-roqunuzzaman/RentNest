import { prisma } from "../../lib/prisma";
import { ICreateCategory } from "./categories.interface";

const createCategory = async (userId: string, payload: ICreateCategory) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
  if (user.role !== "ADMIN") {
    throw new Error("you are not admin you do not have access");
  }
  const category = await prisma.category.create({
    data: {
      ...payload,
    },
  });
  return category;
};

const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const categoryService = {
  createCategory,
  getAllCategories,
};
