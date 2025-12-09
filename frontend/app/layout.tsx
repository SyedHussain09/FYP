import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "../components/providers";
import { AuthProvider } from "../contexts/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { cn } from "../lib/utils";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Career Compass | AI-Powered Career Guidance",
  description:
    "AI-guided career intelligence platform with real-time labor market insights, curated learning paths, and personalized mentorship. Powered by Claude Sonnet 4."
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased scrollbar-thin")}> 
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
          <AuthProvider>
            <Providers>
              <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                {/* Animated background gradients */}
                <div className="pointer-events-none fixed inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
                  <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.15),_transparent_60%)]" />
                  <div className="absolute bottom-0 right-0 h-96 w-96 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.15),_transparent_60%)]" />
                  <div className="absolute left-0 top-1/2 h-96 w-96 bg-[radial-gradient(ellipse_at_left,_rgba(16,185,129,0.1),_transparent_60%)]" />
              </div>
            
            <Navigation />
            
            <main className="relative z-10 flex-1 container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
            
            <Footer />
          </div>
        </Providers>
        </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
