"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "~/components/SalientUI/Container";
import backgroundImage from "~/components/SalientUI/images/background-features.jpg";

import screenshotAI_Powered_Insights from "public/desktopScreenshots/AI_Powered_Insights.png"
import screenshotCentralized_Access from "public/desktopScreenshots/Centralized_Access.png"
import screenshotContent_Creation from "public/desktopScreenshots/AI_Content_Creation.png"
import screenshotContextual_Chatbot from "public/desktopScreenshots/Contextual_Chatbot.png"

const features = [
  {
    title: "Contextual AI Chatbots",
    description:
    "Upload all of your instruction manuals and SOP's and allow your team members to quickly find what they need using natural language.",
    image: screenshotContextual_Chatbot,
  },
  {
    title: "Centralized Access",
    description:
      "Dive into any software tool you use without ever leaving the platform. No more tiresome toggling between apps or web pages.",
    image: screenshotCentralized_Access,
  },
  {
    title: "AI-Powered Insights",
    description:
      "By pooling data from all your integrated software, our AI engine uncovers insights that would have been missed in isolation.",
    image: screenshotAI_Powered_Insights,
  },
  {
    title: "Automated AI Content Creation",
    description:
    "With an intuitive feel for your company, our system can generate personalized marketing content optimized for your business.",
    image: screenshotContent_Creation,
  },

  // {
  //   title: "Swift Decision Making",
  //   description:
  //     "With everything on one screen, you're better equipped to make fast, informed decisions. Respond to changes in real-time.",
  //   image: screenshotReporting,
  // },
];

export function PrimaryFeatures() {
  const [tabOrientation, setTabOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );

  useEffect(() => {
    const lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="team-dashboard"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Give your management one tool, not twenty.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Built from scratch, custom to your needs, and branded to your
            company.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === "vertical"}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        "group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6",
                        selectedIndex === featureIndex
                          ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                          : "hover:bg-white/10 lg:hover:bg-white/5",
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            "font-display ui-not-focus-visible:outline-none text-lg",
                            selectedIndex === featureIndex
                              ? "text-blue-600 lg:text-white"
                              : "text-blue-100 hover:text-white lg:text-white",
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          "mt-2 hidden text-sm lg:block",
                          selectedIndex === featureIndex
                            ? "text-white"
                            : "text-blue-100 group-hover:text-white",
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        className="w-full"
                        src={feature.image}
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
