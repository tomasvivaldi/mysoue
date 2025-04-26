import ".././globals.css";
import type { Metadata } from "next";
import { ApolloWrapper } from "../../lib/apolloWrapper";
import AuthProvider from "../../context/AuthProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Soue",
  description: "Make your sharable wishlist today!",
};

interface RootLayoutProps {
  children: React.ReactNode;
  session: any;
  locale: string;
}

const RootLayout: React.FC<RootLayoutProps> = async ({
  children,
  session,
  locale,
}) => {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`${inter.className} min-h-screen bg-[#fbf9f4]`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider session={session}>
            <ApolloWrapper>
              {children}
            </ApolloWrapper>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
