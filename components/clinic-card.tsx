"use client";

import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Clinic } from "@/lib/clinics-data";

interface ClinicCardProps {
  clinic: Clinic;
}

export function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Link href={`/clinics/${clinic.slug}`} className="group block">
      <article className="h-full overflow-hidden border-b border-border pb-6 transition-colors">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <img
            src={clinic.image}
            alt={clinic.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {clinic.featured && (
            <div className="absolute left-3 top-3">
              <Badge className="bg-primary text-primary-foreground text-[10px] uppercase tracking-wider font-semibold rounded-sm px-2 py-1">
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-4">
          {/* Location & Price */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span className="uppercase tracking-wider">{clinic.city}, GA</span>
            </div>
            <span className="font-medium text-foreground">{clinic.priceRange}</span>
          </div>

          {/* Title */}
          <h3 className="mt-2 font-serif text-xl font-medium text-foreground transition-colors group-hover:text-primary">
            {clinic.name}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium text-foreground">{clinic.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({clinic.reviewCount} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {clinic.description}
          </p>

          {/* Services */}
          <div className="mt-4 flex flex-wrap gap-2">
            {clinic.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="text-xs text-muted-foreground"
              >
                {service}{clinic.services.indexOf(service) < Math.min(clinic.services.length - 1, 2) ? " ·" : ""}
              </span>
            ))}
            {clinic.services.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{clinic.services.length - 3} more
              </span>
            )}
          </div>

          {/* Hours */}
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{clinic.hours}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
