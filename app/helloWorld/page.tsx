"uses client";

import { SessionProvider } from "next-auth/react";
import Content from "./Content";

export default function HelloWorld() {
  return <Content />;
}
