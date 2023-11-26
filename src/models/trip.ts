export type TripStatus =
  | "submitted"
  | "allocated"
  | "arrived"
  | "driving"
  | "completed"
  | "cancelled";

export interface Location {
  location: {
    lat: number;
    lng: number;
  };
  mainText: string;
  secondaryText: string;
}

export interface Type {
  id: number;
  value: string;
}

export interface Trip {
  driver: {
    id: string;
    name: string;
    licensePlate: string;
    carInfo: string;
    phoneNumber: string;
    avatarUrl: string;
    rating: string;
    currentLocation: {
      latitude: number;
      longitude: number;
      address: string;
    };
  };
  customer: {
    id: string;
    name: string;
    phoneNumber: string;
    avatarUrl: string;
    currentLocation: {
      latitude: number;
      longitude: number;
      address: string;
    };
  };
  id: string;
  from: Location;
  to: Location;
  serviceType: Type;
  carType: Type;
  distanceMeters: number;
  distanceText: string;
  status: TripStatus;
  fare: number;
  tripStartAt: number;
  tripEndAt: number;
}
