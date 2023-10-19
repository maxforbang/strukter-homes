import Head from "next/head";
import { Header } from "~/components/PocketUI/Header";
import { Hero } from "~/components/PocketUI/Hero";
import { PrimaryFeatures as DesktopPrimaryFeatures } from "~/components/SalientUI/PrimaryFeatures";
import { SecondaryFeatures as DesktopSecondaryFeatures } from "~/components/SalientUI/SecondaryFeatures";
import { PrimaryFeatures as MobilePrimaryFeatures } from "~/components/PocketUI/PrimaryFeatures";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Strukter Services</title>
        <meta name="description" content="Customized Vacation Rental Technology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <DesktopPrimaryFeatures />
        <MobilePrimaryFeatures />
        <DesktopSecondaryFeatures />
      </main>
    </>
  );
}
