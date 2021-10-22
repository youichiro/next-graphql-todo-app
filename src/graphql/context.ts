import { ServerResponse } from 'http';
import { PrismaClient } from '@prisma/client';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import prisma from '../lib/prisma';

export type Context = {
  prisma: PrismaClient;
  res: ServerResponse;
  req: MicroRequest;
};

export async function createContext({ req, res }): Promise<Context> {
  return { prisma, res, req };
}
