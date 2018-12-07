import Routes, * as nextRoutes from "next-routes";

// @ts-ignore
export const routes = nextRoutes() as Routes;

routes.add("repo", "/:owner/:repo");
