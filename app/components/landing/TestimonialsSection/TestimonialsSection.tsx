import { Carousel } from "@/components/ui/Carousel";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import type { Testimonial } from "@/lib/content/types";

import styles from "./TestimonialsSection.module.css";

export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className={styles.section}>
      <RevealGroup className={styles.heading}>
        <SectionHeading eyebrow="Capítulo quatro" title="Quem passou por aqui" />
      </RevealGroup>
      <RevealGroup>
        <Carousel>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.autor} {...testimonial} />
          ))}
        </Carousel>
      </RevealGroup>
    </section>
  );
}
