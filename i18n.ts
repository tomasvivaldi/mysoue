import {notFound} from "next/navigation";
import {getRequestConfig} from "next-intl/server";

const locales = ["en", "th"];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Return the correct JSON messages for the requested locale
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});