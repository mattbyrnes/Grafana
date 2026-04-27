"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/lib/clinics-data";

interface ClinicFiltersProps {
  selectedService: string;
  sortBy: string;
  onServiceChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
  resultCount: number;
}

export function ClinicFilters({
  selectedService,
  sortBy,
  onServiceChange,
  onSortChange,
  onClearFilters,
  resultCount,
}: ClinicFiltersProps) {
  const hasActiveFilters = selectedService !== "All Services";

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium text-foreground">Filter Clinics</span>
          <span className="text-sm text-muted-foreground">
            ({resultCount} {resultCount === 1 ? "result" : "results"})
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-3">
            <Select value={selectedService} onValueChange={onServiceChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select service" />
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
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="gap-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
