import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "./globals.css";

const title = "VTCSocial — AI Creative Technologist";
const description = "A futuristic portfolio for digital experiences, AI creative direction, brand systems and growth architecture.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [{ url: image, width: 1200, height: 630, alt: "VTCSocial — AI Creative Technologist" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
