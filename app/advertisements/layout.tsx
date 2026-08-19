import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertisements | VTCSocial",
  description: "UGC advertising and modeling photography by VTCSocial.",
};

export default function AdvertisementsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
