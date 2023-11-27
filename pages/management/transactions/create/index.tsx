import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageTitle from "@/components/PageTitle";
import MenuItem from "@mui/material/MenuItem";
import PageTitleWrapper from "@/components/PageTitleWrapper";

import { useState } from "react";

import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import Footer from "@/components/Footer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import GoogleMaps from "@/components/GoogleMapsAutocomplete";

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
  const [tripType, setTripType] = useState();
  const handleChange = (event) => {
    setTripType(event.target.value);
  };

  const [tripServiceType, setValue] = useState();
  const handleChangeServiceType = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Head>
        <title>CreateTrip - Components</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Tạo chuyến đi mới"
          subHeading="Creating a new trip for whose does not have the HCMUSCab app"
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
              <CardHeader title="Customer Information" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "50ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Customer Phone Number"
                      name="customerPhoneNumber"
                      defaultValue=""
                      type="search"
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Full Name"
                      defaultValue=""
                    />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Trip Information" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "102ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <GoogleMaps />
                  </div>
                  <div>
                    <GoogleMaps />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Car Type & Payment Type" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "50ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Car Type"
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
                      label="Service Type"
                      value={tripServiceType}
                      onChange={handleChangeServiceType}
                    >
                      {serviceTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  {tripServiceType === "2" && ( // Only display for VIP serviceType
                    <div>
                      <TextField
                        id="scheduledTime"
                        label="Pickup Time"
                        type="search"
                      />
                    </div>
                  )}
                  <div>
                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="primary"
                    >
                      Create
                    </Button>
                  </div>
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
