"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { LocateFixed, MapPin, Car, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner/Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import {
  getCoordinatesForLocation,
  getCarMarkerOffset,
  distanceKm,
  selectableLocations,
  type Coordinates,
} from "@/lib/location-coordinates";
import type { CarsModel } from "@/models/cars.model";

import "leaflet/dist/leaflet.css";

const RADIUS_OPTIONS_KM = [
  { value: "0", label: "همه" },
  { value: "30", label: "۳۰ ک.م" },
  { value: "50", label: "۵۰ ک.م" },
  { value: "100", label: "۱۰۰ ک.م" },
  { value: "200", label: "۲۰۰ ک.م" },
];

type CarWithPosition = CarsModel & {
  position: Coordinates;
  distanceKm: number;
  indexInCity: number;
};

function FlyTo({ center }: { center: Coordinates }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([center.lat, center.lng], map.getZoom(), { duration: 0.5 });
  }, [center.lat, center.lng, map]);
  return null;
}

function FitBoundsToMarkers({
  cars,
  userLocation,
  trigger,
}: {
  cars: CarWithPosition[];
  userLocation: Coordinates | null;
  trigger: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (trigger === 0 || (cars.length === 0 && !userLocation)) return;
    const points: L.LatLngExpression[] = cars.map((c) => [
      c.position.lat,
      c.position.lng,
    ]);
    if (userLocation) points.push([userLocation.lat, userLocation.lng]);
    const bounds = L.latLngBounds(points);
    map.flyToBounds(bounds, { padding: [40, 40], maxZoom: 11, duration: 0.6 });
  }, [trigger, map, cars, userLocation]);
  return null;
}

function FlyToCar({
  carId,
  cars,
  onFlied,
}: {
  carId: string | null;
  cars: CarWithPosition[];
  onFlied: () => void;
}) {
  const map = useMap();
  useEffect(() => {
    if (!carId) return;
    const car = cars.find((c) => c.id === carId);
    if (!car) return;
    map.flyTo([car.position.lat, car.position.lng], 15, { duration: 0.5 });
    onFlied();
  }, [carId, cars, map, onFlied]);
  return null;
}

function createCarIcon(car: CarsModel, size: number = 44) {
  const imgUrl = car.img.startsWith("http")
    ? car.img
    : `https://cafeerent.com/storage/www/cars/single/${car.img}`;
  return L.divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        background: #fff;
      ">
        <img src="${imgUrl}" alt="${car.name}" style="width:100%;height:100%;object-fit:cover;" />
      </div>
    `,
    className: "car-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function createUserLocationIcon() {
  return L.divIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #0ea5e9;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    `,
    className: "user-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

type Props = {
  cars: CarsModel[];
};

export default function MapView({ cars }: Props) {
  const [mapReady, setMapReady] = useState(false);
  const [center, setCenter] = useState<Coordinates>(() =>
    getCoordinatesForLocation("تهران"),
  );
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [selectedLocationLabel, setSelectedLocationLabel] =
    useState<string>("تهران");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [fitBoundsTrigger, setFitBoundsTrigger] = useState(0);
  const [radiusKm, setRadiusKm] = useState<string>("0");
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const clearSelectedCarId = useCallback(() => setSelectedCarId(null), []);

  const effectiveCenter = userLocation ?? center;

  const carsWithPosition = useMemo(() => {
    const byLocation: Record<string, CarsModel[]> = {};
    cars.forEach((car) => {
      const loc = car.location.trim();
      if (!byLocation[loc]) byLocation[loc] = [];
      byLocation[loc].push(car);
    });

    const withPos: CarWithPosition[] = [];
    Object.entries(byLocation).forEach(([loc, list]) => {
      const base = getCoordinatesForLocation(loc);
      list.forEach((car, i) => {
        const offset = getCarMarkerOffset(i);
        withPos.push({
          ...car,
          position: {
            lat: base.lat + offset.lat,
            lng: base.lng + offset.lng,
          },
          distanceKm: distanceKm(effectiveCenter, base),
          indexInCity: i,
        });
      });
    });

    withPos.sort((a, b) => a.distanceKm - b.distanceKm);
    return withPos;
  }, [cars, effectiveCenter]);

  const radiusKmNum = parseInt(radiusKm, 10) || 0;
  const filteredCars = useMemo(() => {
    if (!userLocation || radiusKmNum <= 0) return carsWithPosition;
    return carsWithPosition.filter((car) => car.distanceKm <= radiusKmNum);
  }, [carsWithPosition, userLocation, radiusKmNum]);

  const handleGps = useCallback(() => {
    setGpsError(null);
    setGpsLoading(true);
    if (!navigator.geolocation) {
      setGpsError("مرورگر شما موقعیت مکانی را پشتیبانی نمی‌کند.");
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newCenter: Coordinates = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(newCenter);
        setCenter(newCenter);
        setGpsLoading(false);
      },
      () => {
        setGpsError("دسترسی به موقعیت مکانی امکان‌پذیر نبود.");
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, []);

  const handleSelectLocation = useCallback((value: string) => {
    setSelectedLocationLabel(value);
    const coords = getCoordinatesForLocation(value);
    setCenter(coords);
    setUserLocation(null);
  }, []);

  useEffect(() => {
    setMapReady(true);
  }, []);

  if (!mapReady) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="h-[400px] rounded-2xl bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "نقشه خودروها" },
        ]}
        className="mb-4"
      />

      <header className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground m-0">
            نزدیک‌ترین خودروها
          </h1>
          <p className="text-muted-foreground text-sm mt-1 m-0">
            موقعیت خود را با GPS یا انتخاب شهر مشخص کنید
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleGps}
            disabled={gpsLoading}
          >
            {gpsLoading ? (
              <>
                <Spinner size={16} className="shrink-0" />
                در حال دریافت...
              </>
            ) : (
              <>
                <LocateFixed className="size-4" />
                موقعیت من
              </>
            )}
          </Button>
          <Select
            value={selectedLocationLabel}
            onValueChange={handleSelectLocation}
          >
            <SelectTrigger className="w-[140px] gap-2">
              <MapPin className="size-4 shrink-0" />
              <SelectValue placeholder="انتخاب شهر" />
            </SelectTrigger>
            <SelectContent>
              {selectableLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {userLocation && (
            <Select value={radiusKm} onValueChange={setRadiusKm}>
              <SelectTrigger className="w-[110px] gap-1 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RADIUS_OPTIONS_KM.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setFitBoundsTrigger((t) => t + 1)}
          >
            <Maximize2 className="size-4" />
            نمایش همه
          </Button>
        </div>
      </header>

      {gpsError && (
        <p className="text-destructive text-sm mb-3" role="alert">
          {gpsError}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start">
        <div className="rounded-2xl overflow-hidden border border-border shadow-lg min-h-[450px]">
          <MapContainer
            center={[effectiveCenter.lat, effectiveCenter.lng]}
            zoom={10}
            className="h-[450px] w-full"
            scrollWheelZoom
          >
            <FlyTo center={effectiveCenter} />
            <FitBoundsToMarkers
              cars={filteredCars}
              userLocation={userLocation}
              trigger={fitBoundsTrigger}
            />
            <FlyToCar
              carId={selectedCarId}
              cars={filteredCars}
              onFlied={clearSelectedCarId}
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && (
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={createUserLocationIcon()}
              >
                <Tooltip permanent={false}>موقعیت شما</Tooltip>
                <Popup>موقعیت شما</Popup>
              </Marker>
            )}
            {filteredCars.map((car) => (
              <Marker
                key={car.id}
                position={[car.position.lat, car.position.lng]}
                icon={createCarIcon(car)}
              >
                <Tooltip
                  direction="bottom"
                  offset={[0, 10]}
                  opacity={0.95}
                  permanent={false}
                >
                  {car.name} — {car.rental.days_3_to_14?.toLocaleString("fa-IR")}{" "}
                  تومان/روز
                </Tooltip>
                <Popup>
                  <div className="min-w-[180px] p-1">
                    <p className="font-bold text-foreground m-0">{car.name}</p>
                    <p className="text-muted-foreground text-sm m-0">
                      {car.model} — {car.location}
                    </p>
                    <Link
                      href={`/cars/${car.id}`}
                      className="text-primary text-sm font-medium mt-2 inline-block"
                    >
                      مشاهده و رزرو
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-4 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-bold text-foreground mb-3 m-0 flex items-center gap-2">
            <Car className="size-5 text-primary" />
            خودروهای نزدیک
            {userLocation && radiusKmNum > 0 ? (
              <span className="text-muted-foreground font-normal text-sm">
                (در شعاع {radiusKmNum} ک.م: {filteredCars.length})
              </span>
            ) : (
              <span className="text-muted-foreground font-normal text-sm">
                ({filteredCars.length})
              </span>
            )}
          </h2>
          {filteredCars.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 m-0">
              {userLocation && radiusKmNum > 0
                ? "در این شعاع خودرویی یافت نشد. شعاع را بیشتر کنید یا شهر را انتخاب کنید."
                : "خودرویی در این محدوده نیست."}
            </p>
          ) : (
          <ul className="space-y-2 max-h-[400px] overflow-y-auto list-none p-0 m-0">
            {filteredCars.map((car) => (
              <li key={car.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedCarId(car.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setSelectedCarId(car.id)
                  }
                  className="flex gap-3 p-2 rounded-xl hover:bg-muted/70 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={
                        car.img.startsWith("http")
                          ? car.img
                          : `https://cafeerent.com/storage/www/cars/single/${car.img}`
                      }
                      alt={car.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm m-0 truncate text-foreground">
                      {car.name}
                    </p>
                    <p className="text-muted-foreground text-xs m-0">
                      {car.location}
                      {userLocation && (
                        <span> — ~{Math.round(car.distanceKm)} ک.م</span>
                      )}
                    </p>
                    <Link
                      href={`/cars/${car.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary text-xs font-medium mt-1 inline-block hover:underline"
                    >
                      مشاهده و رزرو
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
