import { LinkProps } from "@codeponder/ui";
import Routes, * as nextRoutes from "next-routes";
import { ComponentType } from "react";

// @ts-ignore
export const routes = nextRoutes() as Routes;
export const Router = routes.Router;
export const Link = routes.Link as ComponentType<LinkProps>;

routes.add("post", "/post/:id/:path*");
