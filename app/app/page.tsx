import type { Metadata, Viewport } from "next";

import { AboutSection } from "@/components/landing/AboutSection/AboutSection";
import { ChapterStory } from "@/components/landing/ChapterStory/ChapterStory";
import { ChapterToday } from "@/components/landing/ChapterToday/ChapterToday";
import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { Hero } from "@/components/landing/Hero/Hero";
import { InsuranceSection } from "@/components/landing/InsuranceSection/InsuranceSection";
import { LocationsSection } from "@/components/landing/LocationsSection/LocationsSection";
import { ServicesExplorer } from "@/components/landing/ServicesExplorer/ServicesExplorer";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection/TestimonialsSection";
import { WhatsAppFab } from "@/components/landing/WhatsAppFab/WhatsAppFab";
import {
  getInsurances,
  getLocations,
  getProcedures,
  getProfile,
  getTestimonials,
} from "@/lib/content/client";
import { buildCityFilters } from "@/lib/content/derive";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    // No production domain is assigned yet (see README's deployment note) —
    // NEXT_PUBLIC_SITE_URL must be set before deploy so social previews
    // resolve absolute image URLs correctly.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: `${profile.nome} — Cirurgiã-Dentista em ${profile.cities.join(" e ")}`,
    description:
      "Atendimento odontológico acolhedor e seguro em São José dos Campos e Mogi das Cruzes. Prevenção, restauração, limpeza, clareamento, odontopediatria, cirurgia, urgência e botox. CRO-SP 176648.",
    openGraph: {
      type: "profile",
      title: `${profile.nome} — Cirurgiã-Dentista`,
      description:
        "Cuidar do seu sorriso é a minha história. Atendimento acolhedor em São José dos Campos e Mogi das Cruzes.",
      images: ["/images/apresentacao-gabriela.jpg"],
      locale: "pt_BR",
    },
    other: {
      "geo.region": "BR-SP",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#F2DBCE",
};

export default async function HomePage() {
  const [profile, procedures, locations, testimonials, insurances] = await Promise.all([
    getProfile(),
    getProcedures(),
    getLocations(),
    getTestimonials(),
    getInsurances(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: profile.nome,
    identifier: profile.cro,
    telephone: profile.tel,
    email: profile.email,
    sameAs: [`https://instagram.com/${profile.instagram}`],
    priceRange: "$$",
    location: locations.map((location) => ({
      "@type": "Place",
      name: `Consultório ${location.bairro}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: location.cidade,
        addressRegion: "SP",
        addressCountry: "BR",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader profile={profile} />
      <main>
        <Hero profile={profile} />
        <ChapterStory />
        <ChapterToday />
        <AboutSection />
        <TestimonialsSection testimonials={testimonials} />
        <ServicesExplorer procedures={procedures} />
        <LocationsSection locations={locations} cityFilters={buildCityFilters(profile)} />
        <InsuranceSection insurances={insurances} />
        <ContactFooter profile={profile} />
      </main>
      <WhatsAppFab profile={profile} />
    </>
  );
}
