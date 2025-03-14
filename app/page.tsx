import React from "react";
import { Metadata } from "next";
import Home from "@/components/pages/home";

export const metadata: Metadata = {
  metadataBase: new URL(`https://beeneural.com/`),
  title: {
    template: "LEARNAI - AI Solutions | Home",
    default: `LEARNAI - AI Solutions | Home`,
  },
  alternates: {
    canonical: "./",
  },
  description: "LEARNAI  Artificial Intelligence Company",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/ico",
        url: "/favicon.ico",
      },
    ],
  },
};

const page = () => {
  return <Home />;
};

export default page;
