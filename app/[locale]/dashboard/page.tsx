import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface DashboardPageProps {
  params: {
    locale: string;
  };
}

export default async function DashboardPage({ params: { locale } }: DashboardPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect(`/${locale}/login`);
  }

  redirect(`/${locale}/dashboard/my-wishlists`);
}
