import { HeaderDefault } from "../components/HeaderDefault";
import HomePage from "./home";

import { Div } from "../styles/pages/index";
import { MiddleSection } from "../styles/components/middleSection";

import Head from "next/head";

export default function Index() {
  return (
    <Div className="container">
      <Head>
        <title>Home | Find.it</title>
      </Head>
      <HomePage />
    </Div>
  );
}
