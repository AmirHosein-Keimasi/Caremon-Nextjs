/**
 * نگاشت نام محل (شهر/استان) به مختصات تقریبی برای نمایش روی نقشه
 * کلیدها با فیلد location خودروها (نام استان) سینک هستند.
 */

export type Coordinates = { lat: number; lng: number };

/** مختصات مرکز/شهر اصلی هر استان (پخش در سراسر ایران) */
export const locationCoordinates: Record<string, Coordinates> = {
  // استان‌ها
  "استان تهران": { lat: 35.6892, lng: 51.389 },
  "استان اصفهان": { lat: 32.6546, lng: 51.668 },
  "استان خراسان رضوی": { lat: 36.2974, lng: 59.6062 },
  "استان البرز": { lat: 35.8327, lng: 50.9916 },
  "استان فارس": { lat: 29.5918, lng: 52.5836 },
  "استان آذربایجان شرقی": { lat: 38.0962, lng: 46.2738 },
  "استان گیلان": { lat: 37.2809, lng: 49.5832 },
  "استان یزد": { lat: 31.8974, lng: 54.3569 },
  "استان مازندران": { lat: 36.5633, lng: 53.0601 },
  "استان آذربایجان غربی": { lat: 37.5527, lng: 45.0761 },
  "استان خوزستان": { lat: 31.3183, lng: 48.6706 },
  "استان همدان": { lat: 34.799, lng: 48.5146 },
  "استان کرمان": { lat: 30.2839, lng: 57.0834 },
  "استان کرمانشاه": { lat: 34.3142, lng: 47.065 },
  "استان قزوین": { lat: 36.2699, lng: 50.0049 },
  "استان مرکزی": { lat: 34.0956, lng: 49.7012 },
  "استان قم": { lat: 34.6416, lng: 50.8746 },
  "استان گلستان": { lat: 36.8456, lng: 54.4393 },
  "استان زنجان": { lat: 36.6769, lng: 48.4963 },
  "استان سمنان": { lat: 35.5729, lng: 53.3971 },
  "استان کردستان": { lat: 35.3219, lng: 46.9862 },
  "استان بوشهر": { lat: 28.9234, lng: 50.8203 },
  "استان اردبیل": { lat: 38.2493, lng: 48.2963 },
  "استان لرستان": { lat: 33.4878, lng: 48.3558 },
  "استان هرمزگان": { lat: 27.1832, lng: 56.2666 },
  "استان چهارمحال و بختیاری": { lat: 32.3256, lng: 50.8644 },
  "استان ایلام": { lat: 33.6374, lng: 46.4226 },
  "استان کهگیلویه و بویراحمد": { lat: 30.668, lng: 51.588 },
  "استان خراسان شمالی": { lat: 37.475, lng: 57.3293 },
  "استان خراسان جنوبی": { lat: 32.8649, lng: 59.2262 },
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
  ساری: { lat: 36.5633, lng: 53.0601 },
  ارومیه: { lat: 37.5527, lng: 45.0761 },
  اهواز: { lat: 31.3183, lng: 48.6706 },
  همدان: { lat: 34.799, lng: 48.5146 },
  کرمان: { lat: 30.2839, lng: 57.0834 },
  کرمانشاه: { lat: 34.3142, lng: 47.065 },
  قزوین: { lat: 36.2699, lng: 50.0049 },
  اراک: { lat: 34.0956, lng: 49.7012 },
  قم: { lat: 34.6416, lng: 50.8746 },
  گرگان: { lat: 36.8456, lng: 54.4393 },
  زنجان: { lat: 36.6769, lng: 48.4963 },
  سمنان: { lat: 35.5729, lng: 53.3971 },
  سنندج: { lat: 35.3219, lng: 46.9862 },
  بندرعباس: { lat: 27.1832, lng: 56.2666 },
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
