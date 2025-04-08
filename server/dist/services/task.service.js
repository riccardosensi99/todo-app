"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasksByUserId = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getTasksByUserId = (userId) => {
    return prisma_1.default.task.findMany({ where: { userId } });
};
exports.getTasksByUserId = getTasksByUserId;
const getTaskById = (id) => {
    return prisma_1.default.task.findUnique({ where: { id } });
};
exports.getTaskById = getTaskById;
const createTask = (data) => {
    return prisma_1.default.task.create({ data });
};
exports.createTask = createTask;
const updateTask = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma_1.default.task.findUnique({ where: { id } });
    if (!existing)
        return null;
    return prisma_1.default.task.update({ where: { id }, data });
});
exports.updateTask = updateTask;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma_1.default.task.findUnique({ where: { id } });
    if (!existing)
        return null;
    return prisma_1.default.task.delete({ where: { id } });
});
exports.deleteTask = deleteTask;
