import { Card } from '@mui/material';
import { Trip } from '@/models/trip';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const trips: Trip[] = [
    {
      driver: {
        id: '962a8325-0cfd-4853-9fd9-108e6e0ed155',
        name: 'John Doe',
        licensePlate: '51B1-123456',
        carInfo: 'Toyota Camry',
        phoneNumber: '+1234567890',
        avatarUrl: 'https://i.ibb.co/L81BT4w/avatar-portrait.png',
        rating: '4',
        currentLocation: {
          latitude: 10.8398821,
          longitude: 106.8293289,
          address: 'Some Street, City, Country'
        }
      },
      customer: {
        id: '962a8325-0cfd-4853-9fd9-108e6e0ed155',
        name: 'Customer Name',
        phoneNumber: '+1234567890',
        avatarUrl: 'https://i.ibb.co/L81BT4w/avatar-portrait.png',
        currentLocation: {
          latitude: 10.8398821,
          longitude: 106.8293289,
          address: 'Some Street, City, Country'
        }
      },
      tripId: '123456789',
      from: {
        location: {
          lat: 10.8428625,
          lng: 106.8346228
        },
        mainText: 'Vinhomes Grand Park - Origami S7.01',
        secondaryText: 'Long Bình, Hồ Chí Minh, Thành phố Hồ Chí Minh, Vietnam'
      },
      to: {
        location: {
          lat: 10.8756461,
          lng: 106.7965896
        },
        mainText: 'Ho Chi Minh City University of Science (Linh Trung Campus)',
        secondaryText:
          'Phường Linh Trung, Thành Phố Thủ Đức, Ho Chi Minh City, Vietnam'
      },
      distanceMeters: 5000,
      distanceText: '5 km',
      status: 'arrived',
      fare: 15000,
      tripStartAt: subDays(new Date(), 1).getTime(), // trip started 1 day ago
      tripEndAt: new Date().getTime(), // trip ended now
      carType: {
        id: 1,
        value: '4-seat'
      },
      serviceType: {
        id: 1,
        value: 'Regular'
      }
    },
    {
      driver: {
        id: '962a8325-0cfd-4853-9fd9-108e6e0ed155',
        name: 'John Doe',
        licensePlate: '51B1-123456',
        carInfo: 'Toyota Camry',
        phoneNumber: '+1234567890',
        avatarUrl: 'https://i.ibb.co/L81BT4w/avatar-portrait.png',
        rating: '4',
        currentLocation: {
          latitude: 10.8398821,
          longitude: 106.8293289,
          address: 'Some Street, City, Country'
        }
      },
      customer: {
        id: '962a8325-0cfd-4853-9fd9-108e6e0ed155',
        name: 'Customer Name',
        phoneNumber: '+1234567890',
        avatarUrl: 'https://i.ibb.co/L81BT4w/avatar-portrait.png',
        currentLocation: {
          latitude: 10.8398821,
          longitude: 106.8293289,
          address: 'Some Street, City, Country'
        }
      },
      tripId: '123456789',
      from: {
        location: {
          lat: 10.8428625,
          lng: 106.8346228
        },
        mainText: 'Vinhomes Grand Park - Origami S7.01',
        secondaryText: 'Long Bình, Hồ Chí Minh, Thành phố Hồ Chí Minh, Vietnam'
      },
      to: {
        location: {
          lat: 10.8756461,
          lng: 106.7965896
        },
        mainText: 'Ho Chi Minh City University of Science (Linh Trung Campus)',
        secondaryText:
          'Phường Linh Trung, Thành Phố Thủ Đức, Ho Chi Minh City, Vietnam'
      },
      distanceMeters: 5000,
      distanceText: '5 km',
      status: 'submitted',
      fare: 15000,
      tripStartAt: subDays(new Date(), 1).getTime(), // trip started 1 day ago
      tripEndAt: new Date().getTime(),
      carType: {
        id: 1,
        value: '4-seat'
      },
      serviceType: {
        id: 1,
        value: 'Regular'
      }
    },
    {
      driver: {
        id: '962a8325-0cfd-4853-9fd9-108e6e0ed155',
        name: 'John Doe',
        licensePlate: '51B1-123456',
        carInfo: 'Toyota Camry',
        phoneNumber: '+1234567890',
        avatarUrl: 'https://i.ibb.co/L81BT4w/avatar-portrait.png',
        rating: '4',
        currentLocation: {
          latitude: 10.8398821,
          longitude: 106.8293289,
          address: 'Some Street, City, Country'
        }
      },
      customer: {
        id: '962a8325-0cfd-4853-9fd9-108e6e0ed155',
        name: 'Customer Name',
        phoneNumber: '+1234567890',
        avatarUrl: 'https://i.ibb.co/L81BT4w/avatar-portrait.png',
        currentLocation: {
          latitude: 10.8398821,
          longitude: 106.8293289,
          address: 'Some Street, City, Country'
        }
      },
      tripId: '123456789',
      from: {
        location: {
          lat: 10.8428625,
          lng: 106.8346228
        },
        mainText: 'Vinhomes Grand Park - Origami S7.01',
        secondaryText: 'Long Bình, Hồ Chí Minh, Thành phố Hồ Chí Minh, Vietnam'
      },
      to: {
        location: {
          lat: 10.8756461,
          lng: 106.7965896
        },
        mainText: 'Ho Chi Minh City University of Science (Linh Trung Campus)',
        secondaryText:
          'Phường Linh Trung, Thành Phố Thủ Đức, Ho Chi Minh City, Vietnam'
      },
      distanceMeters: 5000,
      distanceText: '5 km',
      status: 'completed',
      fare: 15000,
      tripStartAt: subDays(new Date(), 1).getTime(), // trip started 1 day ago
      tripEndAt: new Date().getTime(),
      carType: {
        id: 2,
        value: '7-seat'
      },
      serviceType: {
        id: 1,
        value: 'VIP'
      }
    }
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={trips} />
    </Card>
  );
}

export default RecentOrders;
