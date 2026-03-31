/** @format */

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // 1. تحميل ملفات الترجمة الأساسية
  const baseMessages = (await import(`../messages/${locale}.json`)).default;
  const layoutMessages = (await import(`../messages/layout/${locale}.json`))
    .default;
  const skillsMessages = (await import(`../messages/skills/${locale}.json`))
    .default;
  const projectsMessages = (await import(`../messages/Projects/${locale}.json`))
    .default;
  const contactMessages = (await import(`../messages/Contact/${locale}.json`))
    .default;
  const experienceMessages = (
    await import(`../messages/Experience/${locale}.json`)
  ).default;

  return {
    locale,
    messages: {
      ...baseMessages,
      Navbar: layoutMessages.Navbar,
      Footer: layoutMessages.Footer,
      Skills: skillsMessages,
      Projects: projectsMessages,
      Contact: contactMessages,
      Experience: experienceMessages,
    },
  };
});
