import React from "react";
import Footer from "@/components/dashboard/Footer";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import MobileNavbar from "@/components/aline_design/Dashboard/MobileNavbar";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { useLocale } from "next-intl";
import ClientLayout from "./ClientLayout";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function Layout({ children, params: { locale } }: LayoutProps) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClientLayout>{children}</ClientLayout>
    </NextIntlClientProvider>
  );
}