import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageTitle from "@/components/PageTitle";
import MenuItem from "@mui/material/MenuItem";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import Footer from "@/components/Footer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import GoogleMapsAutocomplete from "@/components/GoogleMapsAutocomplete";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchDirection } from "pages/api/GoogleMapsApi";

import {
  createCustomer,
  createTrip,
  fetchCalculateFare,
  fetchCustomerInfo,
} from "pages/api/BackendApi";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const carTypes = [
  {
    value: "1",
    label: "4-Seat",
  },
  {
    value: "2",
    label: "7-Seat",
  },
];

const serviceTypes = [
  {
    value: "1",
    label: "Regular",
  },
  {
    value: "2",
    label: "VIP",
  },
];

function CreateTrip() {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [tripFare, setTripFare] = useState(null);
  const [tripDistance, setTripDistance] = useState(null);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [scheduleTime, setScheduleTime] = useState<Dayjs | null>(dayjs());
  const router = useRouter();

  const handleLocationSelect = (location, isDestination) => {
    if (isDestination) {
      setDestinationLocation(location);
    } else {
      setPickupLocation(location);
    }
  };

  const handlePhoneNumberChange = async (event) => {
    const phoneNumber = event.target.value;
    setCustomerPhoneNumber(phoneNumber);

    try {
      const customerInfo = await fetchCustomerInfo(phoneNumber);

      if (!customerInfo) {
        setCustomerName("");
        setCustomerId(null);
      }

      setCustomerName(customerInfo?.name || "");
      setCustomerId(customerInfo?.id || null);
      setCustomerType(customerInfo?.CustomerType?.name || "");
    } catch (error) {
      console.error("Error fetching customer information:", error);
    }
  };

  useEffect(() => {
    console.log("scheduledTime:", scheduleTime);
  }, [scheduleTime]);

  const [tripType, setTripType] = useState("");
  const handleChange = (event) => {
    setTripType(event.target.value);
  };

  const [tripServiceType, setValue] = useState("");
  const handleChangeServiceType = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      fetchDirection(pickupLocation, destinationLocation)
        .then((distance) => {
          setTripDistance(distance);
        })
        .catch((error) => {
          console.error("Error fetching directions:", error);
        });
    }
  }, [pickupLocation, destinationLocation]);

  useEffect(() => {
    if (pickupLocation && destinationLocation && tripType && tripServiceType) {
      fetchCalculateFare(tripDistance, tripType, tripServiceType)
        .then((fare) => {
          setTripFare(fare);
        })
        .catch((error) => {
          console.error("Error calculating trip fare:", error);
        });
    }
  });

  const handleCreateTrip = async () => {
    try {
      if (!customerId) {
        const customer = await createCustomer(
          customerPhoneNumber,
          customerName
        );
        setCustomerId(customer?.id || null);
        console.log("Creating a new customer ID");
      }

      const trip = await createTrip(
        pickupLocation,
        destinationLocation,
        customerId,
        tripServiceType,
        tripDistance,
        tripFare,
        scheduleTime
      );

      console.log("Trip created successfully:", trip);

      setPopupVisible(true);

      setTimeout(() => {
        router.push("/management/transactions");
      }, 3000);
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <Head>
        <title>CreateTrip - Components</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Tạo chuyến đi mới"
          subHeading="Tạo chuyến đi mới cho khách hàng không sử dụng ứng dụng HCMUBCab hoặc khách hàng mới."
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Thông tin khách hàng" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "30ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Số điện thoại khách hàng"
                      name="customerPhoneNumber"
                      defaultValue=""
                      type="search"
                      onChange={handlePhoneNumberChange}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Tên khách hàng"
                      defaultValue=""
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                    />
                    <TextField
                      disabled={true}
                      id="outlined-required"
                      label="Hạng khách hàng"
                      defaultValue=""
                      value={customerType}
                      onChange={(event) => setCustomerType(event.target.value)}
                    />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Thông tin chuyến đi" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "94ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <GoogleMapsAutocomplete
                      label="Chọn điểm đón"
                      onPlaceSelect={(location) =>
                        handleLocationSelect(location, false)
                      }
                    />
                  </div>
                  <div>
                    <GoogleMapsAutocomplete
                      label="Chọn điểm tới"
                      onPlaceSelect={(location) =>
                        handleLocationSelect(location, true)
                      }
                    />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Loại xe và loại dịch vụ" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "30ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Loại xe"
                      value={tripType}
                      onChange={handleChange}
                    >
                      {carTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Loại dịch vụ"
                      value={tripServiceType}
                      onChange={handleChangeServiceType}
                    >
                      {serviceTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {tripServiceType === "2" && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Hẹn giờ đón"
                          value={scheduleTime}
                          onChange={(newValue) => setScheduleTime(newValue)}
                        />
                      </LocalizationProvider>
                    )}
                  </div>
                  {tripDistance && tripFare && (
                    <div>
                      <Typography variant="body1" gutterBottom sx={{ ml: 1 }}>
                        Khoảng cách: {(tripDistance / 1000).toFixed(2)} KM, Giá
                        tiền: {tripFare.toLocaleString()} VND
                      </Typography>
                    </div>
                  )}
                  <div>
                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="primary"
                      onClick={handleCreateTrip}
                    >
                      Create
                    </Button>
                  </div>
                  {popupVisible && (
                    <Snackbar
                      open={popupVisible}
                      autoHideDuration={6000}
                      onClose={closePopup}
                      message="Tạo chuyến đi thành công!"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

CreateTrip.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CreateTrip;
