export type CarsModel = {
  id: string;
  name: string;
  model: string;
  rental: {
    days_3_to_14: number;
    more_than_14_days: number;
    minimum_rental: number;
    deposit: number;
  };
  capacity: {
    passengers: number;
    luggage: number;
    door: number;
  };
  features: {
    cruise_control: boolean;
    chassis_type: string;
    option_type: string;
    hill_start_assist: boolean;
    transmission: string;
    apple_carplay: boolean;
    seat_heating: boolean;
    seat_cooling: boolean;
    air_conditioning: boolean;
    rear_sensor: boolean;
    audio_system: string;
    monitor: string;
    driver_seat_adjustment: string;
    panoramic_roof: boolean;
    gps: boolean;
    connectivity: string[];
    braking_system: string[];
    auto_park: boolean;
    auto_drive: boolean;
  };
  engine: {
    type: string;
    capacity: number;
    cylinders: number;
    acceleration: number;
    fuel_consumption: number;
  };
  with_driver: string;
  driver_rental: {
    hourly_10: number;
    intercity_per_km: number;
    airport_transfer: number;
  };
  img: string;
  location: string;
  reviewCount: number;
  ratingNumber: number;
};
