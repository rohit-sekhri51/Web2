
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Added below to Path: mono-cicd/week27/packages/db/package.json
// "exports": {
//     "./client": "./index.ts"   
//   },