/**
 * نگاشت نام محل (شهر/استان) به مختصات تقریبی برای نمایش روی نقشه
 * کلیدها با فیلد location خودروها (نام استان) سینک هستند.
 */

export type Coordinates = { lat: number; lng: number };

/** مختصات مرکز/شهر اصلی هر استان */
export const locationCoordinates: Record<string, Coordinates> = {
  // نام استان (هماهنگ با location خودروها)
  "استان تهران": { lat: 35.6892, lng: 51.389 },
  "استان اصفهان": { lat: 32.6546, lng: 51.668 },
  "استان خراسان رضوی": { lat: 36.2974, lng: 59.6062 },
  "استان البرز": { lat: 35.8327, lng: 50.9916 },
  "استان فارس": { lat: 29.5918, lng: 52.5836 },
  "استان آذربایجان شرقی": { lat: 38.0962, lng: 46.2738 },
  "استان گیلان": { lat: 37.2809, lng: 49.5832 },
  "استان یزد": { lat: 31.8974, lng: 54.3569 },
  // نام شهر (برای سازگاری با گذشته و انتخاب دستی)
  تهران: { lat: 35.6892, lng: 51.389 },
  مشهد: { lat: 36.2974, lng: 59.6062 },
  اصفهان: { lat: 32.6546, lng: 51.668 },
  شیراز: { lat: 29.5918, lng: 52.5836 },
  تبریز: { lat: 38.0962, lng: 46.2738 },
  کرج: { lat: 35.8327, lng: 50.9916 },
  البرز: { lat: 35.8327, lng: 50.9916 },
  "خراسان رضوی": { lat: 36.2974, lng: 59.6062 },
  رشت: { lat: 37.2809, lng: 49.5832 },
  یزد: { lat: 31.8974, lng: 54.3569 },
};

const defaultCenter: Coordinates = { lat: 35.6892, lng: 51.389 }; // تهران

/**
 * مختصات تقریبی یک محل را برمی‌گرداند
 */
export function getCoordinatesForLocation(location: string): Coordinates {
  const key = location.trim();
  return locationCoordinates[key] ?? defaultCenter;
}

/**
 * برای خودروهای متعدد در یک شهر، افست کوچک برای عدم هم‌پوشانی مارکرها
 */
export function getCarMarkerOffset(index: number): {
  lat: number;
  lng: number;
} {
  const step = 0.008;
  const row = Math.floor(index / 3);
  const col = index % 3;
  return {
    lat: (row - 1) * step,
    lng: (col - 1) * step,
  };
}

/**
 * فاصله تقریبی دو نقطه (کیلومتر) - فرمول Haversine ساده
 */
export function distanceKm(a: Coordinates, b: Coordinates): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

export const selectableLocations = Object.keys(locationCoordinates);
