/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import {
  BuildingOffice2Icon,
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { api } from "~/utils/api";
import clsx from "clsx";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    mutate: sendEmail,
    isLoading,
    isSuccess,
    error,
  } = api.email.send.useMutation({ onSettled: () => setFormSubmitted(true) });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const fnameInputElement =
      form.querySelector<HTMLInputElement>("#first-name");
    const lnameInputElement =
      form.querySelector<HTMLInputElement>("#last-name");
    const emailInputElement = form.querySelector<HTMLInputElement>("#email");
    const phoneInputElement =
      form.querySelector<HTMLInputElement>("#phone-number");
    const messageInputElement =
      form.querySelector<HTMLTextAreaElement>("#message");

    if (
      !fnameInputElement ||
      !lnameInputElement ||
      !emailInputElement ||
      !phoneInputElement ||
      !messageInputElement
    ) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    sendEmail({
      fname: fnameInputElement.value,
      lname: lnameInputElement.value,
      email: emailInputElement.value,
      phone: phoneInputElement.value,
      message: messageInputElement.value,
    });
  };

  return (
    <div id="contact" className="relative isolate bg-gray-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
              <svg
                className="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-gray-800/20"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
                />
              </svg>
              <div
                className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                  style={{
                    clipPath:
                      "polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)",
                  }}
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-200">
              Get in touch
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {`Interested in any of our services? Give a brief description of
              your vacation rental company's situation and we'll be in contact
              to see if we can help you.`}
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon
                    className="h-7 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  4706 Chiquita Blvd S
                  <br />
                  Cape Coral, FL 33914
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon
                    className="h-7 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a className="hover:text-white" href="tel:+1 (555) 234-5678">
                    +1 (703) 679-7985
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon
                    className="h-7 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a
                    className="hover:text-white"
                    href="mailto:hello@example.com"
                  >
                    sales@strukter.io
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {formSubmitted ? (
          <div className="flex h-full w-full flex-col items-center justify-center px-12 text-center text-2xl ">
            {isSuccess ? (
              <div className="flex items-center gap-5 py-10 text-center text-white">
                <p>Your message has been delivered.</p>
                <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
              </div>
            ) : (
              <div className="flex flex-col gap-8 text-white">
                <p>
                  There has been an error submitting your message. Please try
                  again or reach out directly through email or phone.
                </p>
                {error && (
                  <p className="text-md animate-pulse px-12 text-center text-rose-400">
                    {/* {`Error: ${error}`} */}
                    {`Error`}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
          >
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold leading-6 text-slate-200"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-slate-200 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold leading-6 text-slate-200"
                  >
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-slate-200 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-slate-200"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      autoComplete="email"
                      className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-slate-200 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-semibold leading-6 text-slate-200"
                  >
                    Phone number
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="tel"
                      name="phone-number"
                      id="phone-number"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-slate-200 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-slate-200"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-slate-200 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-end">
                <button
                  type="submit"
                  className={clsx(
                    "h-10 w-32 rounded-md  text-center text-sm font-semibold shadow-sm duration-150 hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                    isLoading
                      ? "bg-slate-300 text-slate-800"
                      : "bg-gradient-to-br from-[#0694D8] to-[#00DFD8] text-slate-800",
                  )}
                >
                  {isLoading ? (
                    // <FadeLoader className="mx-auto" />
                    <div className="mx-auto w-min">
                      <Spinner />
                    </div>
                  ) : (
                    "Send message"
                  )}
                </button>
              </div>
              {errorMsg !== "" && (
                <p className="text-md mt-10 animate-pulse px-12 text-center text-rose-500">
                  {errorMsg}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="h-6 w-6 animate-spin fill-slate-300 text-black dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
