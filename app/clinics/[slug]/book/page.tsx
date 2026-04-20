"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Calendar, Clock, User, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { clinics, type Clinic } from "@/lib/clinics-data";

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];

export default function BookAppointmentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const foundClinic = clinics.find((c) => c.slug === slug);
    if (foundClinic) {
      setClinic(foundClinic);
    }
  }, [slug]);

  if (!clinic) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedService || !name || !phone) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isFormValid = selectedDate && selectedTime && selectedService && name && phone;

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <Card className="w-full max-w-md border-border">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Booking Request Sent
              </h2>
              <p className="text-muted-foreground">
                Your appointment request for{" "}
                <span className="font-medium text-foreground">{clinic.name}</span> has been
                submitted. The clinic will contact you at{" "}
                <span className="font-medium text-foreground">{phone}</span> to confirm your
                appointment.
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Date:</span>{" "}
                  {selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <span className="font-medium text-foreground">Time:</span> {selectedTime}
                </p>
                <p>
                  <span className="font-medium text-foreground">Service:</span> {selectedService}
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" asChild>
                  <Link href={`/clinics/${slug}`}>Back to Clinic</Link>
                </Button>
                <Button asChild>
                  <Link href="/">Browse Clinics</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href={`/clinics/${slug}`}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to {clinic.name}
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Book an Appointment
            </h1>
            <p className="mt-2 text-muted-foreground">
              Schedule your visit at {clinic.name}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Column - Date & Time */}
              <div className="space-y-6">
                {/* Date Selection */}
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <CardTitle className="text-base">Select Date</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || date.getDay() === 0;
                      }}
                      className="rounded-md border-0 p-0"
                    />
                  </CardContent>
                </Card>

                {/* Time Selection */}
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <CardTitle className="text-base">Select Time</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          className="text-xs"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Service & Contact */}
              <div className="space-y-6">
                {/* Service Selection */}
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Select Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinic.serviceDetails.map((service) => (
                          <SelectItem key={service.name} value={service.name}>
                            <div className="flex items-center justify-between gap-4">
                              <span>{service.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {service.price}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedService && (
                      <div className="mt-4 rounded-md bg-muted/50 p-3">
                        {clinic.serviceDetails
                          .filter((s) => s.name === selectedService)
                          .map((service) => (
                            <div key={service.name}>
                              <p className="text-sm text-muted-foreground">
                                {service.description}
                              </p>
                              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="font-medium text-foreground">
                                  {service.price}
                                </span>
                                <span>{service.duration}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Your Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Summary & Submit */}
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Clinic</span>
                        <span className="font-medium text-foreground">{clinic.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium text-foreground">
                          {selectedDate
                            ? selectedDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Not selected"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium text-foreground">
                          {selectedTime || "Not selected"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-medium text-foreground">
                          {selectedService || "Not selected"}
                        </span>
                      </div>
                    </div>

                    <hr className="border-border" />

                    <Button
                      type="submit"
                      className="w-full gap-2"
                      disabled={!isFormValid || isSubmitting}
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Calendar className="h-4 w-4" />
                          Request Appointment
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      The clinic will contact you to confirm your appointment
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
