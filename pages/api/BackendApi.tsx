import { Dayjs } from "dayjs";

const BACKEND_HOST: string = process.env.NEXT_PUBLIC_BACKEND_HOST!;

const getUserToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userToken");
    return token || null;
  }
  return null;
};

const getHeaders = async () => {
  const token = getUserToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

interface CalculateFareResponse {
  fare: number;
}

export const fetchCalculateFare = async (
  length: number,
  tripType: string,
  tripServiceType: string
): Promise<number> => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BACKEND_HOST}/api/trips/calculate-fare`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        length,
        tripType,
        serviceType: tripServiceType,
      }),
    });

    const data: CalculateFareResponse = await response.json();
    const fare: number = data.fare;
    console.log("Trip Fare:", fare);
    return fare;
  } catch (error) {
    console.error("Error calculating trip fare:", error);
    throw error;
  }
};

export const fetchStatistics = async (): Promise<number> => {
  try {
    const headers = await getHeaders();

    const response = await fetch(`${BACKEND_HOST}/api/statistics`, {
      method: "GET",
      headers: headers,
      credentials: "same-origin",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting statistics: ", error);
    throw error;
  }
};

interface CustomerInfo {
  name: string;
  id: null;
  CustomerType: any;
  // Define the structure of your customer info here
}

export const fetchCustomerInfo = async (
  customerPhoneNumber: string
): Promise<CustomerInfo> => {
  try {
    const headers = await getHeaders();
    const response = await fetch(
      `${BACKEND_HOST}/api/customers/search?phone=${customerPhoneNumber}`,
      {
        method: "GET",
        headers: headers,
        credentials: "same-origin",
      }
    );

    const customer: CustomerInfo[] = await response.json();
    console.log("Customer:", customer[0]);
    return customer[0];
  } catch (error) {
    console.error("Error getting customer info:", error);
    throw error;
  }
};

interface CreateCustomerResponse {
  id: null;
}

export const createCustomer = async (
  phoneNumber: string,
  name: string
): Promise<CreateCustomerResponse> => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BACKEND_HOST}/api/customers/create`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        phoneNumber,
        name,
      }),
    });

    const customer: CreateCustomerResponse = await response.json();
    console.log("Customer:", customer);
    return customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

interface CreateTripResponse {
  // Define the structure of your create trip response here
}

export const createTrip = async (
  pickupLocation: any,
  dropoffLocation: any,
  customerId: string,
  tripServiceType: string,
  distance: number,
  fare: number,
  scheduleTime: Dayjs
): Promise<CreateTripResponse> => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BACKEND_HOST}/api/trips`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        pickupLocation: pickupLocation.structured_formatting.main_text,
        pickupLocationLat: pickupLocation.location.lat,
        pickupLocationLong: pickupLocation.location.lng,
        dropoffLocation: dropoffLocation.structured_formatting.main_text,
        dropoffLocationLat: dropoffLocation.location.lat,
        dropoffLocationLong: dropoffLocation.location.lng,
        customerId,
        fare,
        distance,
        serviceTypeId: tripServiceType,
        scheduleTime: scheduleTime.valueOf(),
      }),
    });

    const trip: CreateTripResponse = await response.json();
    console.log("Trip:", trip);
    return trip;
  } catch (error) {
    console.error("Error creating a new trip: ", error);
    throw error;
  }
};
