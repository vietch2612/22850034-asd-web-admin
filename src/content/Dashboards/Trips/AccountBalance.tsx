import {
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
} from "@mui/material";
import TrendingUp from "@mui/icons-material/TrendingUp";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import Text from "src/components/Text";
import { Chart } from "src/components/Chart";
import type { ApexOptions } from "apexcharts";

import useAccountBalanceData from "./AccountBlanceData";
import numeral from "numeral";

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === "dark"
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function AccountBalance() {
  const [
    totalRevenue,
    totalCustomers,
    totalDrivers,
    totalTrips,
    changeOnThisMonth,
    totalTripsByStatus,
  ] = useAccountBalanceData();
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
    colors: [
      "#ff9900",
      "#1c81c2",
      "#333",
      "#5c6ac0",
      "#ff9900",
      "#1c81c2",
      "#333",
      "#5c6ac0",
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]],
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5,
        },
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5,
      },
    },
    fill: {
      opacity: 1,
    },
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100],
      },
      show: false,
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartSeries = totalTripsByStatus
    ? totalTripsByStatus.map(
        (statusItem: any) => (statusItem.total / totalTrips) * 100
      )
    : [0, 0];

  const statusNamesMap = {
    0: "Mới tạo",
    1: "Đã có tài xế",
    2: "Tài xe đến điểm đón",
    3: "Đang trong chuyến đi",
    4: "Hoàn thành",
    5: "Đã huỷ",
    6: "Hẹn giờ",
  };

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3,
              }}
              variant="h4"
            >
              Tổng doanh thu
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                {numeral(totalRevenue).format(`${totalRevenue}0,0`)}
                {" VND"}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
              >
                {totalTrips} chuyến đi
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4,
                }}
                alignItems="center"
              >
                <AvatarSuccess
                  sx={{
                    mr: 2,
                  }}
                  variant="rounded"
                >
                  <TrendingUp fontSize="large" />
                </AvatarSuccess>
                <Box>
                  <Typography variant="h4">+ {changeOnThisMonth}%</Typography>
                  <Typography variant="subtitle2" noWrap>
                    this month
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: "relative",
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: "none", md: "inline-block" },
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Chart
                  height={250}
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                />
              </Grid>
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List
                  disablePadding
                  sx={{
                    width: "100%",
                  }}
                >
                  {totalTripsByStatus?.map((statusItem: any) => (
                    <ListItem key={statusItem.status} disableGutters>
                      <ListItemAvatarWrapper>
                        {statusItem.status === 4 ? (
                          <DirectionsCarIcon fontSize="large" />
                        ) : (
                          <LocalTaxiIcon fontSize="large" />
                        )}
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary={statusNamesMap[statusItem.status]}
                        primaryTypographyProps={{
                          variant: "h5",
                          noWrap: true,
                        }}
                        secondary={`Total trips: ${statusItem.total}`}
                        secondaryTypographyProps={{
                          variant: "subtitle2",
                          noWrap: true,
                        }}
                      />
                      <Box>
                        <Typography align="right" variant="h4" noWrap>
                          {((statusItem.total / totalTrips) * 100).toFixed(2)}%
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
