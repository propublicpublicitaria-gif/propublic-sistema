import "./globals.css";
import type {Metadata} from "next";
export const metadata:Metadata={title:"ProPublic | Gestión",description:"Sistema de gestión de ProPublic Industria Publicitaria"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}