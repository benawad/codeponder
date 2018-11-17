import { Request } from "express";

export const isAuthenticated = (req: Request) => {
  if (!req || !req.session || !req.session.userId) {
    throw new Error("not authenticated");
  }
};
