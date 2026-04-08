"use client";

import Link from "next/link";
import { Star, MapPin, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Clinic } from "@/lib/clinics-data";

interface ClinicCardProps {
  clinic: Clinic;
}

export function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Link href={`/clinics/${clinic.slug}`}>
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30 h-full cursor-pointer">
      {clinic.featured && (
        <div className="absolute right-4 top-4 z-10">
          <Badge className="bg-primary text-primary-foreground gap-1">
            <Award className="h-3 w-3" />
            Featured
          </Badge>
        </div>
      )}

      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={clinic.image}
          alt={clinic.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {clinic.name}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{clinic.city}, GA</span>
              <span className="text-border">•</span>
              <span>{clinic.region}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">{clinic.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({clinic.reviewCount} reviews)
          </span>
          <span className="ml-auto text-sm font-medium text-primary">
            {clinic.priceRange}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {clinic.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {clinic.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {clinic.services.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{clinic.services.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" />
          <span>{clinic.hours}</span>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
