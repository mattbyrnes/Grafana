"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regions, services } from "@/lib/clinics-data";

interface ClinicFiltersProps {
  selectedRegion: string;
  selectedService: string;
  sortBy: string;
  onRegionChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
  resultCount: number;
}

export function ClinicFilters({
  selectedRegion,
  selectedService,
  sortBy,
  onRegionChange,
  onServiceChange,
  onSortChange,
  onClearFilters,
  resultCount,
}: ClinicFiltersProps) {
  const hasActiveFilters =
    selectedRegion !== "All Regions" || selectedService !== "All Services";

  return (
    <div className="border-b border-border pb-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground">
            {resultCount} {resultCount === 1 ? "clinic" : "clinics"}
          </span>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <X className="h-3 w-3" />
              Clear filters
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-3">
            <Select value={selectedRegion} onValueChange={onRegionChange}>
              <SelectTrigger className="h-10 w-full border-border bg-background text-sm sm:w-[160px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedService} onValueChange={onServiceChange}>
              <SelectTrigger className="h-10 w-full border-border bg-background text-sm sm:w-[160px]">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="h-10 w-full border-border bg-background text-sm sm:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
