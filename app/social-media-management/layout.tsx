import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Management | VTCSocial",
  description: "Selected social media management clients at VTCSocial.",
};

export default function SocialMediaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
