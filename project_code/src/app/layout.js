import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from '@/components/side-nav';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider" 

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        {/* <MaxWidthWrapper> */}
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <div className="flex">
            <SideNav />
            <main className="flex-1">{children}</main>
            
          </div>
          
      {/* </MaxWidthWrapper> */}
          {/* <BottomNav /> */}
          </ThemeProvider>
    </body>
  </html>
  );
}
