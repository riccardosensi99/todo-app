import prisma from '../utils/prisma';

export const getTasksByUserId = (userId: number) => {
  return prisma.task.findMany({ where: { userId } });
};

export const getTaskById = (id: string) => {
  return prisma.task.findUnique({ where: { id } });
};

export const createTask = (data: { title: string; description?: string; userId: number }) => {
  return prisma.task.create({ data });
};

export const updateTask = async (
  id: string,
  data: { title?: string; description?: string; completed?: boolean }
) => {
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return null;

  return prisma.task.update({ where: { id }, data });
};

export const deleteTask = async (id: string) => {
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return null;

  return prisma.task.delete({ where: { id } });
};
