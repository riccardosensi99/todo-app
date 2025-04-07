import prisma from '../utils/prisma';

export const getAllTasks = () => {
  return prisma.task.findMany({ include: { user: true } });
};

export const createTask = (data: { title: string; userId: number }) => {
  return prisma.task.create({ data });
};

export const toggleTask = (id: number) => {
  return prisma.task.update({
    where: { id },
    data: { completed: true },
  });
};
