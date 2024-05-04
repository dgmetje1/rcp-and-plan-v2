import { NextFunction, Request, RequestHandler, Response } from "express";
import client from "./redisClient";
import Container from "@api/DI";
import { SocialService } from "@api/services/social";
import { UserAccountResponse } from "@rcp-and-plan/bc_social";

const getUserEntryKey = (accountId: string) => `user-${accountId}`;

export const userMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accountId = req.auth?.payload.sub?.split("|").pop() || "";
  const cacheKey = getUserEntryKey(accountId);

  if (!client.isOpen) await client.connect();
  const accountRaw = await client.get(cacheKey);
  let account: UserAccountResponse = accountRaw ? JSON.parse(accountRaw) : null;

  if (!account) {
    const { container } = await Container.getInstance();
    const socialService = container.get<SocialService>("SocialService");

    const response = await socialService.getUserByAccountId(accountId);
    account = response.data;

    client.set(cacheKey, JSON.stringify(account), { EX: 3600 });
  }

  req.context.user = account;

  next();
};
