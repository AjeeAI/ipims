"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.Prisma = exports.PrismaClient = void 0;
var prisma_1 = require("./generated/prisma");
Object.defineProperty(exports, "PrismaClient", { enumerable: true, get: function () { return prisma_1.PrismaClient; } });
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return prisma_1.Prisma; } });
const prisma_2 = require("./generated/prisma");
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma ??
    new prisma_2.PrismaClient({
        log: process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
//# sourceMappingURL=index.js.map