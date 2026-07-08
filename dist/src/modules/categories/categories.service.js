import { prisma } from "../../lib/prisma";
const createCategory = async (userId, payload) => {
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
const updateCategory = async (categoryId, payload) => {
    if (!categoryId) {
        throw new Error("Category id is required");
    }
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    return await prisma.category.update({
        where: { id: categoryId },
        data: payload,
    });
};
const deleteCategory = async (categoryId) => {
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
        include: { properties: true },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    if (category.properties.length > 0) {
        throw new Error("Cannot delete category with properties");
    }
    return await prisma.category.delete({
        where: { id: categoryId },
    });
};
export const categoryService = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=categories.service.js.map