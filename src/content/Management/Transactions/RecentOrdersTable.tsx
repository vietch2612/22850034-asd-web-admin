import { FC, ChangeEvent, useState } from "react";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  CardHeader,
} from "@mui/material";

import Label from "@/components/Label";
import { Trip, TripStatus } from "@/models/trip";

interface RecentOrdersTableProps {
  className?: string;
  tripOrders: Trip[];
}
interface Filters {
  status?: TripStatus;
}

const getStatusLabel = (tripStatus: TripStatus): JSX.Element => {
  const map = {
    0: {
      text: "Mới tạo",
      color: "waring",
    },
    1: {
      text: "Đã có tài xế",
      color: "waring",
    },
    2: {
      text: "Tài xe đến điểm đón",
      color: "waring",
    },
    3: {
      text: "Đang trong chuyến đi",
      color: "waring",
    },
    4: {
      text: "Hoàn thành",
      color: "success",
    },
    5: {
      text: "Đã huỷ",
      color: "error",
    },
    6: {
      text: "Hẹn giờ",
      color: "success",
    },
  };

  const { text, color }: any = map[tripStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (tripOrders: Trip[], filters: Filters): Trip[] => {
  return tripOrders.filter((tripOrder) => {
    let matches = true;

    if (filters.status && tripOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  tripOrders: Trip[],
  page: number,
  limit: number
): Trip[] => {
  return tripOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ tripOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const statusOptions = [
    { id: "all", name: "All" },
    { id: 0, name: "Mới tạo" },
    {
      id: 1,
      name: "Đã có tài xế",
    },
    {
      id: 2,
      name: "Tài xe đến điểm đón",
    },
    {
      id: 3,
      name: "Đang trong chuyến đi",
    },
    {
      id: 4,
      name: "Hoàn thành",
    },
    {
      id: 5,
      name: "Đã huỷ",
    },
    {
      id: 6,
      name: "Hẹn giờ",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredTripOrder = applyFilters(tripOrders, filters);
  const paginatedTrips = applyPagination(filteredTripOrder, page, limit);

  return (
    <Card>
      {
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || "all"}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Danh sách chuyến đi"
        />
      }
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Tài xế/Xe</TableCell>
              <TableCell>Điểm đón</TableCell>
              <TableCell>Điểm trả</TableCell>
              <TableCell align="right">Quãng đường</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTrips.map((tripOrder) => {
              return (
                <TableRow hover key={tripOrder.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(tripOrder.createdAt).toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.Customer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tripOrder.Customer.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.Driver ? (
                        tripOrder.Driver.name
                      ) : (
                        <span style={{ color: "red" }}>Chưa có tài xế</span>
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tripOrder.ServiceType.name},{" "}
                      {tripOrder.Driver ? tripOrder.Driver.Car.name : ""}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ maxWidth: "200px" }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.pickupLocation}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ maxWidth: "200px" }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.dropoffLocation}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.distance / 1000} km
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {numeral(tripOrder.fare).format(`${tripOrder.fare}0,0`)}{" "}
                      VND
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(tripOrder.status)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredTripOrder.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  tripOrders: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
  tripOrders: [],
};

export default RecentOrdersTable;
