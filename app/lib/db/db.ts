import {PrismaClient} from '@prisma/client'

const prismaClientSingleton=()=>
{
    return new PrismaClient () // Create a new PrismaClient instance

}

declare const globalThis:{
    prismaGlobal:ReturnType<typeof prismaClientSingleton>

}& typeof global;

const db=globalThis.prismaGlobal??prismaClientSingleton()

export default db;

if(process.env.NODE_ENV!=='production') globalThis.prismaGlobal=db;

// What this file does is:
// 1. It creates a singleton instance of PrismaClient to avoid multiple connections to the database in development mode.
// 2. It exports this instance as `db`, which can be used throughout the application to interact with the database.
// 3. It checks if the environment is not production, and if so, assigns the instance to `globalThis.prismaGlobal` to ensure that the same instance is reused across module imports.
// This is particularly useful in Next.js applications where the server can be restarted frequently during development, leading to multiple instances of PrismaClient being created if not handled properly.
