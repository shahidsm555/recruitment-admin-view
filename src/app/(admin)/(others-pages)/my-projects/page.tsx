import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import MyProjectsTable from "@/components/my-projects/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js My Projects | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js My Projects page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="My Projects" />
      <MyProjectsTable />
    </div>
  );
}
