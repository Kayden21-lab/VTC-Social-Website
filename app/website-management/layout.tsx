import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Management | VTCSocial",
  description: "Selected website management clients at VTCSocial.",
};

export default function WebsiteManagementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
