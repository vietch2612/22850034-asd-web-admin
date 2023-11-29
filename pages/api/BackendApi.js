const BACKEND_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

export const fetchCalculateFare = async (length, tripType, tripServiceType) => {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/trips/calculate-fare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer Test',
            },
            body: JSON.stringify({
                length,
                tripType,
                tripServiceType,
            }),
        });

        const data = await response.json();
        const fare = data.fare;
        console.log('Trip Fare:', fare);
        return fare;
    } catch (error) {
        console.error('Error calculating trip fare:', error);
        throw error;
    }
};

export const fetchCustomerInfo = async (custonerPhoneNumber) => {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/customers/search?phone=${custonerPhoneNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer Test',
            }
        });

        const customer = await response.json();
        console.log('Customer:', customer[0]);
        return customer[0];
    } catch (error) {
        console.error('Error getting customer info:', error);
        throw error;
    }
};

export const createCustomer = async (phoneNumber, name) => {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/trips/calculate-fare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer Test',
            },
            body: JSON.stringify({
                phoneNumber,
                name
            }),
        });

        const customer = await response.json();
        console.log('Customer:', customer);
        return customer;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};


export const createTrip = async (pickupLocation, dropoffLocation, customerId, tripServiceType, distance, fare) => {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/trips`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer Test',
            },
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
                serviceTypeId: tripServiceType
            }),
        });

        const trip = await response.json();
        console.log('Trip:', trip);
        return trip;
    } catch (error) {
        console.error('Error creating a new trip: ', error);
        throw error;
    }
};