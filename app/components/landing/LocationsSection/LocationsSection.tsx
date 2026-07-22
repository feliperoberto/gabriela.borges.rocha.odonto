"use client";

import { useState } from "react";

import { Carousel } from "@/components/ui/Carousel";
import { Chip } from "@/components/ui/Chip";
import { LocationCard } from "@/components/ui/LocationCard";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Location } from "@/lib/content/types";

import styles from "./LocationsSection.module.css";

export interface LocationsSectionProps {
  locations: Location[];
  cityFilters: string[];
}

export function LocationsSection({ locations, cityFilters }: LocationsSectionProps) {
  const [city, setCity] = useState("Todas");
  const filtered = locations.filter((location) => city === "Todas" || location.cidade === city);

  return (
    <section id="unidades" className={styles.section}>
      <div className={styles.layout}>
        <RevealGroup className={styles.heading}>
          <SectionHeading eyebrow="Capítulo seis" title="Onde você me encontra" />
        </RevealGroup>
        <RevealGroup className={styles.filters}>
          {cityFilters.map((option) => (
            <Chip
              key={option}
              variant="city"
              selected={city === option}
              onClick={() => setCity(option)}
            >
              {option}
            </Chip>
          ))}
        </RevealGroup>
        <RevealGroup>
          <Carousel>
            {filtered.map((location) => (
              <LocationCard key={location.slug} {...location} />
            ))}
          </Carousel>
        </RevealGroup>
      </div>
    </section>
  );
}
