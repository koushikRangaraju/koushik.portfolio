import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CursorProvider } from "@/context/CursorContext";
import ClientLayout from "@/components/ClientLayout";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-jakarta" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Koushik Rangaraju — Cloud Computing Student & Full Stack Developer",
  description: "Cloud Computing Student and Full Stack Developer from Hyderabad. Building impactful products with Java, Spring Boot, AWS and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${jetbrains.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CursorProvider>
            <ClientLayout>{children}</ClientLayout>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
