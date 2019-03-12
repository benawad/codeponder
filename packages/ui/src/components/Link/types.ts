import { LinkProps as OriginalLinkProps } from "next/link";
interface RouteParams {
  [k: string]: string | string[] | number | {};
}

export interface RouteLinkProps {
  route: string;
  params?: RouteParams;
}

export const defaultLinkProps = {
  route: "",
};

// add string[] to next-routes.d.ts params type
export interface LinkProps extends OriginalLinkProps, RouteLinkProps {}
