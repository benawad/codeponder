import * as React from "react";
import Head from "next/head";
import { Container } from "semantic-ui-react";

type Props = {
  title?: string;
};

const Layout: React.SFC<Props> = ({
  children,
  title = "This is the default title"
}) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </Container>
);

export default Layout;
