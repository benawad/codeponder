import * as React from "react";
import { Link } from "../../../server/routes";

export const FilePath: React.FC<{
  id: string;
  name: string;
  path?: string;
}> = ({ id, name, path }) => {
  if (!path) {
    return null;
  }

  const parts = [name, ...path.split("/")];
  const currentPath: string[] = [];

  return (
    <>
      {parts.map((part, idx) => {
        if (idx) {
          currentPath.push(part);
        }

        if (idx === parts.length - 1) {
          return <span key={part + idx}>{part}</span>;
        }

        return (
          <React.Fragment key={part + idx}>
            <Link
              route="post"
              params={{
                id,
                path: [...currentPath] as any,
              }}
            >
              <a>{part}</a>
            </Link>
            /
          </React.Fragment>
        );
      })}
    </>
  );
};
