const optionLabelMap: Record<string, string> = {
  gps: "جی پی اس",
  "child-seat": "صندلی کودک",
  wifi: "وای فای",
  insurance: "بیمه توسعه یافته",
  "fuel-full": "تحویل با باک پر",
  parking: "پارکینگ رایگان",
};

export const toPersianOptionLabel = (option: string): string => {
  const normalized = option.trim().toLowerCase();
  return optionLabelMap[normalized] ?? option;
};
