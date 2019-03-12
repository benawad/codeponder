import Link from "next/link";
import React from "react";

export default () => (
  <div style={{ fontSize: 20 }}>
    <div>Could not find the page you were looking for.</div>
    <Link href="/">
      <a>go back to home page</a>
    </Link>
  </div>
);
