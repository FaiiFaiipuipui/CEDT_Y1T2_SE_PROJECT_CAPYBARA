import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import GlobalNavBar from "@/components/GlobalNavBar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NextAuthProvider from "./providers/NextAuthProvider";

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin", "thai", "latin-ext"],
});

export const metadata: Metadata = {
  title: "CBS | Capybara",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={prompt.className}>
        <NextAuthProvider session={nextAuthSession}>
          <div className="z-50 w-full fixed ">
            <GlobalNavBar />
          </div>
          <div className="pt-[70px]">{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
