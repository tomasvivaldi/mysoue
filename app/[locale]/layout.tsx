import ".././globals.css";
import type { Metadata } from "next";
import { ApolloWrapper } from "../../lib/apolloWrapper";
import AuthProvider from "../../context/AuthProvider";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";

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
    <ApolloWrapper>
      <AuthProvider session={session}>
        <html lang={locale}>
          <body className="min-h-screen bg-[#fbf9f4]  ">
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </body>
        </html>
      </AuthProvider>
    </ApolloWrapper>
  );
};

export default RootLayout;
