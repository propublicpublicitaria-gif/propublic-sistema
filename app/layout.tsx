import "./globals.css";
import "./catalog-public.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProPublic | Industria Publicitaria",
  description: "Catálogo digital de productos publicitarios de ProPublic Industria Publicitaria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
