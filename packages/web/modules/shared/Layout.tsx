import { Wrapper } from "@codeponder/ui";
import Head from "next/head";
import * as React from "react";
import { NavBar } from "./NavBar";

interface Props {
  title: string;
}

export const Layout: React.SFC<Props> = ({ children, title }): JSX.Element => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Rubik:400,500"
        rel="stylesheet"
      />
    </Head>
    <Wrapper>
      <NavBar />
      {children}
    </Wrapper>
  </div>
);
