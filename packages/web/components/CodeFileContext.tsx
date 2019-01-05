import { createContext } from "react";

export interface ContextProps {
  code: string | null;
  lang: string;
  owner: string;
  path?: string;
  postId: string;
}

export const CodeFileContext = createContext<ContextProps>({} as any);
