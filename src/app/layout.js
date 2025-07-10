import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import BackendStatusIndicator from "@/components/BackendStatusIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cityसेवा - Local Services Marketplace",
  description: "Connecting local communities with trusted local service providers",
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    shortcut: '/favicon/favicon.ico',
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <ThemeToggle />
            {/* Backend status indicator - only visible in development */}
            {process.env.NODE_ENV === 'development' && (
              <div id="backend-status-container" suppressHydrationWarning>
                {typeof window !== 'undefined' && (
                  <BackendStatusIndicator />
                )}
              </div>
            )}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}