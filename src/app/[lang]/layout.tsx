import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import { i18n } from "../../../i18n-config";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {FALLBACK_SEO} from "@/app/[lang]/utils/constants";


async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.sections.links",
      "navbar.navbarLogo.logoImg",
      "contactLinks",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({ params } : { params: {lang: string}}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  // Always use the local AMI logo as favicon for consistent branding
  const localIcon = '/images/ami-logo.png';

  if (!meta.data) {
    return {
      ...FALLBACK_SEO,
      icons: { icon: localIcon },
    };
  }

  const { metadata } = meta.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: localIcon,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  const global = await getGlobal(params.lang);
  // Keep the app renderable even when Strapi is unavailable.
  if (!global.data) {
    return (
      <html lang={params.lang}>
        <head>
          <meta
            name="google-site-verification"
            content="ZyFKgr-YLYlRLU9t8xA8WBpZwWry8tVd1ratIl62Few"
          />
          <link rel="icon" href="/images/ami-logo.png" type="image/png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        </head>
        <body className="font-sans">
          <main className="min-h-screen flex items-center justify-center p-8 text-center bg-white">
            <div>
              <h1 className="text-2xl font-semibold text-ami-navy">Content service is unavailable</h1>
              <p className="mt-3 text-sm text-ami-slate">
                The frontend is running, but it cannot reach Strapi at localhost:1337.
              </p>
            </div>
          </main>
        </body>
      </html>
    );
  }
  
  const { notificationBanner, navbar, footer } = global.data.attributes;
  const contactLinks = global.data.attributes.contactLinks ?? [];
  const navbarSections = navbar.sections ?? [];

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data?.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data?.attributes.url
  );

  return (
    <html lang={params.lang}>
      <head>
        <meta
          name="google-site-verification"
          content="ZyFKgr-YLYlRLU9t8xA8WBpZwWry8tVd1ratIl62Few"
        />
        <link rel="icon" href="/images/ami-logo.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-white text-ami-slate">
        <Navbar
          links={navbar.links}
          sections={navbarSections}
          contactLinks={contactLinks}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          contactLinks={contactLinks}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories.data}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
