import Link from "next/link";
import Layout from "../components/Layout";
import { Button } from "semantic-ui-react";

export default () => (
  <Layout title="Landing Page | Code Ponder">
    <h1>Code Ponder 🤔</h1>
    <h4>Marketplace for Code Reviews</h4>
    <h2>How it works</h2>
    <ol>
      <li>Coder requests a code review</li>
      <li>Experts offer assistance</li>
      <li>Coder picks favorite expert</li>
      <li>Selected expert receives a request to review the code on github</li>
    </ol>
    <p>
      <Link href="/register">
        <a>
          <Button>Register as a Coder</Button>
        </a>
      </Link>
    </p>
    <p>
      <Link href="/register">
        <a>
          <Button>Register as an Expert</Button>
        </a>
      </Link>
    </p>
    <p>
      <a href="https://github.com/benawad/codeponder">
        This is an Open Source Project
      </a>
    </p>
  </Layout>
);
