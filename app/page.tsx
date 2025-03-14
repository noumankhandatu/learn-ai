import React from "react";
import { Metadata } from "next";
import Home from "@/components/pages/home";

export const metadata: Metadata = {
  title: {
    template: "LEARNAI - AI Solutions | Home",
    default: `LEARNAI - AI Solutions | Home`,
  },
  alternates: {
    canonical: "./",
  },
  description: "LEARNAI  Artificial Intelligence Company",
};

const page = () => {
  return <Home />;
};

export default page;
