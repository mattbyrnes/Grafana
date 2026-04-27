"use client";

import { useState, useMemo, useEffect } from "react";
import { Hero } from "@/components/hero";
import { ClinicFilters } from "@/components/clinic-filters";
import { ClinicCard } from "@/components/clinic-card";
import { clinics, type Clinic } from "@/lib/clinics-data";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { ClinicMap } from "@/components/clinic-map";
import { SearchX, List, Map } from "lucide-react";

export function ClinicDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("All Services");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [userSubmittedClinics, setUserSubmittedClinics] = useState<Clinic[]>([]);

  useEffect(() => {
    const loadUserClinics = async () => {
      try {
        const response = await fetch("/api/clinics");
        if (response.ok) {
          const dbClinics = await response.json();
          const formatted = dbClinics.map((clinic: any) => ({
            id: `user-${clinic.id}`,
            slug: `user/${clinic.id}`,
            name: clinic.name,
            city: clinic.city,
            region: clinic.region,
            address: clinic.address,
            phone: clinic.phone,
            website: clinic.website || "",
            services: Array.isArray(clinic.services) ? clinic.services : [],
            priceRange: clinic.priceRange || "$",
            hours: clinic.hours,
            description: clinic.description,
            image: clinic.image || "/clinics/vitality-iv-lounge.jpg",
            rating: 0,
            reviewCount: 0,
            featured: false,
            mapEmbedQuery: `${clinic.name} ${clinic.city} Georgia`,
            longDescription: clinic.description,
            amenities: [],
            certifications: [],
            reviews: [],
            servicesMenu: [],
            hoursDetailed: {},
          }));
          setUserSubmittedClinics(formatted);
        }
      } catch (error) {
        console.error("Failed to load clinics from API:", error);
      }
    };
    loadUserClinics();
  }, []);

  const allClinics = useMemo(
    () => [...userSubmittedClinics, ...clinics],
    [userSubmittedClinics]
  );

  const filteredAndSortedClinics = useMemo(() => {
    let filtered = allClinics;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (clinic) =>
          clinic.name.toLowerCase().includes(query) ||
          clinic.city.toLowerCase().includes(query) ||
          clinic.region.toLowerCase().includes(query) ||
          clinic.services.some((service) =>
            service.toLowerCase().includes(query)
          ) ||
          clinic.description.toLowerCase().includes(query)
      );
    }

    // Service filter
    if (selectedService !== "All Services") {
      filtered = filtered.filter((clinic) =>
        clinic.services.includes(selectedService)
      );
    }

    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "featured":
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedService, sortBy, allClinics]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedService("All Services");
    setSortBy("featured");
  };

  return (
    <>
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <section id="clinics" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ClinicFilters
              selectedService={selectedService}
              sortBy={sortBy}
              onServiceChange={setSelectedService}
              onSortChange={setSortBy}
              onClearFilters={clearFilters}
              resultCount={filteredAndSortedClinics.length}
            />
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="gap-2"
              >
                <List className="h-4 w-4" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="gap-2"
              >
                <Map className="h-4 w-4" />
                Map
              </Button>
            </div>
          </div>

          {filteredAndSortedClinics.length > 0 ? (
            viewMode === "list" ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAndSortedClinics.map((clinic) => (
                  <ClinicCard key={`${clinic.slug}-${clinic.id}`} clinic={clinic} />
                ))}
              </div>
            ) : (
              <div className="mt-8">
                <ClinicMap clinics={filteredAndSortedClinics} />
              </div>
            )
          ) : (
            <div className="mt-12">
              <Empty className="border border-border">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <SearchX className="size-5" />
                  </EmptyMedia>
                  <EmptyTitle>No clinics found</EmptyTitle>
                  <EmptyDescription>
                    Try adjusting your search or filters to find more clinics.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
