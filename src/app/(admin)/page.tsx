import type { Metadata } from "next";
import DashboardWrapper from "@/components/DashboardWrapper";

export const metadata: Metadata = {
  title: "Next.js Dashboard",
  description: "This is Next.js Dashboard Template",
};

export default function Ecommerce() {
  return <DashboardWrapper />;
}
