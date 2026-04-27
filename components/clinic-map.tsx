"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, Star, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Clinic } from "@/lib/clinics-data";

// Accurate geocoded coordinates for all clinics based on actual addresses
const clinicCoordinates: Record<string, [number, number]> = {
  // Atlanta - Midtown/Downtown
  "drip-hydration-atlanta": [33.7628, -84.3748], // 691 John Wesley Dobbs Ave NE
  "replenish-atlanta": [33.7714, -84.3766], // 525 North Avenue NE
  "hydrate-iv-bar": [33.7897, -84.3876], // 1270 Spring St NW
  "restore-hyper-wellness-midtown": [33.7787, -84.3645], // 931 Monroe Dr NE
  "liquid-life-wellness": [33.7847, -84.3836], // 905 Juniper St NE
  "4ever-young-midtown": [33.7893, -84.3880], // 1080 W Peachtree St NW
  
  // Atlanta - Virginia Highlands / Buckhead
  "hydraplus-virginia-highlands": [33.7739, -84.3502], // 675 N Highland Ave NE
  "hydraplus-buckhead": [33.8420, -84.3790], // 2221 Peachtree Rd Q
  "vida-flo-buckhead": [33.8456, -84.3621], // 2900 Peachtree Rd NW
  "prime-iv-toco-hills": [33.8171, -84.3231], // 3019 N Druid Hills Rd
  
  // Atlanta - Westside
  "restore-hyper-wellness-westside": [33.8056, -84.4278], // 2250 Marietta Blvd NW
  
  // Decatur
  "vida-flo-decatur": [33.7748, -84.2964], // 431 W Ponce de Leon Ave
  
  // Smyrna
  "prime-iv-smyrna": [33.8631, -84.5144], // 4500 W Village Pl
  
  // Marietta
  "prime-iv-marietta": [33.9671, -84.4365], // 1205 Johnson Ferry Rd
  "drip-and-glow-marietta": [33.9335, -84.4680], // 3827 Roswell Rd
  
  // Dunwoody
  "restore-dunwoody": [33.9276, -84.3350], // 4706 Ashford Dunwoody Rd
  
  // Alpharetta
  "restore-alpharetta": [34.0724, -84.2941], // 7155 Avalon Wy
  "iv-nutrition-alpharetta": [34.0489, -84.2808], // 9925 Haynes Bridge Rd
  
  // Roswell
  "prime-iv-roswell-corners": [34.0395, -84.3475], // 1155 Woodstock Rd
  "whydrate-roswell": [34.0234, -84.3516], // 1245 Alpharetta St
  "ultimate-hydration-roswell": [34.0512, -84.3489], // 1905 Woodstock Rd
  "vita-infusions-roswell": [34.0621, -84.3381], // 1240 Upper Hembree Rd
  
  // Johns Creek / Peachtree Corners
  "vida-flo-johns-creek": [34.0289, -84.1978], // 10900 Medlock Bridge Rd
  "prime-iv-peachtree-corners": [33.9689, -84.2256], // 5215 Town Center Blvd
  "mycare-clinic-peachtree-corners": [33.9689, -84.2300], // Peachtree Corners, GA
  
  // Kennesaw
  "whydrate-kennesaw": [34.0234, -84.5812], // 2615 George Busbee Pkwy NW
  "tia-hydrate-kennesaw": [34.0289, -84.5967], // 3772 Cherokee St NW
  
  // Duluth / Suwanee
  "ivy-clinic-duluth": [33.9634, -84.1456], // 2005 Boggs Rd NW
  "purifi-iv-suwanee": [34.0178, -84.0689], // 1500 Peachtree Industrial Blvd
  "twelvestone-infusion-center-duluth": [33.9856, -84.1167], // 2925 Premiere Pkwy
  
  // Buford
  "revive-iv-lounge-buford": [34.0734, -83.9856], // 2725 Mall of Georgia Blvd
  
  // Dacula / Lawrenceville / Lilburn
  "gwinnett-iv-therapy-dacula": [33.9823, -83.8934], // 3577 Braselton Hwy
  "just-infusion-plus-lawrenceville": [33.9478, -84.0489], // 4955 Sugarloaf Pkwy
  "iv-vitamin-hydration-lawrenceville": [33.9612, -84.0278], // 5425 Sugarloaf Pkwy
  "its-the-drip-lilburn": [33.8823, -84.1134], // 3100 Five Forks Trickum Rd SW
  
  // Peachtree City
  "sluice-drip-spa-peachtree-city": [33.3967, -84.5589], // 23 Eastbrook Bend
};

// Default coordinates for clinics without specific mappings (Metro Atlanta center)
const DEFAULT_COORDS: [number, number] = [33.7490, -84.3880];

interface ClinicMapProps {
  clinics: Clinic[];
}

export function ClinicMap({ clinics }: ClinicMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      if (typeof window === "undefined" || !mapRef.current) return;

      // Import Leaflet
      const L = (await import("leaflet")).default;

      // Import Leaflet CSS
      await import("leaflet/dist/leaflet.css");

      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Create custom icon with bright red color
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width: 32px; height: 32px; background-color: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3); border: 2px solid white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Initialize map centered on Metro Atlanta
      if (!mapInstanceRef.current) {
        const map = L.map(mapRef.current, {
          center: [33.7749, -84.3880],
          zoom: 11,
          scrollWheelZoom: true,
        });

        // Add tile layer (OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapInstanceRef.current = map;
        setIsMapLoaded(true);
      }

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Add markers for each clinic
      clinics.forEach((clinic) => {
        const coords = clinicCoordinates[clinic.slug] || DEFAULT_COORDS;
        
        // Add small random offset for clinics without specific coordinates to prevent overlap
        const offset = clinicCoordinates[clinic.slug] ? [0, 0] : [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ];
        
        const marker = L.marker([coords[0] + offset[0], coords[1] + offset[1]], {
          icon: customIcon,
        }).addTo(mapInstanceRef.current);

        marker.on("click", () => {
          setSelectedClinic(clinic);
        });

        markersRef.current.push(marker);
      });

      // Fit bounds to show all markers if there are any
      if (markersRef.current.length > 0) {
        const group = L.featureGroup(markersRef.current);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [clinics]);

  return (
    <div className="relative h-[600px] w-full rounded-lg overflow-hidden border border-border">
      {/* Map Container */}
      <div ref={mapRef} className="h-full w-full z-0" />

      {/* Selected Clinic Card */}
      {selectedClinic && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] md:left-auto md:right-4 md:w-96">
          <Card className="shadow-xl">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={selectedClinic.image}
                    alt={selectedClinic.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {selectedClinic.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{selectedClinic.city}, GA</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{selectedClinic.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({selectedClinic.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{selectedClinic.hours}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {selectedClinic.services.slice(0, 3).map((service) => (
                  <Badge key={service} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/clinics/${selectedClinic.slug}`}>
                    View Details
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedClinic(null)}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading state */}
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {/* Custom marker styles */}
      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}
