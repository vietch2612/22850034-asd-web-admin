import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
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
  useTheme,
  CardHeader
} from '@mui/material';

import Label from '@/components/Label';
import { Trip, TripStatus } from '@/models/trip';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: Trip[];
}

interface Filters {
  status?: TripStatus;
}

const getStatusLabel = (tripStatus: TripStatus): JSX.Element => {
  const map = {
    submitted: {
      text: 'Submitted',
      color: 'warning'
    },
    allocated: {
      text: 'warning',
      color: 'success'
    },
    arrived: {
      text: 'Arrived',
      color: 'warning'
    },
    driving: {
      text: 'Driving',
      color: 'warning'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    cancelled: {
      text: 'Cancelled',
      color: 'error'
    }
  };

  const { text, color }: any = map[tripStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (cryptoOrders: Trip[], filters: Filters): Trip[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: Trip[],
  page: number,
  limit: number
): Trip[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'submitted',
      name: 'Submitted'
    },
    {
      id: 'arrived',
      name: 'Arrivied'
    },
    {
      id: 'driving',
      name: 'Driving'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'cancelled',
      name: 'Cancelled'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  return (
    <Card>
      {
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.name} value={statusOption.name}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Trips"
        />
      }
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Type & Service</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell align="right">Length</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              cryptoOrder.tripId;
              return (
                <TableRow hover key={cryptoOrder.tripId}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {cryptoOrder.tripId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {format(cryptoOrder.tripStartAt, 'MMMM dd yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {cryptoOrder.customer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cryptoOrder.customer.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {cryptoOrder.carType.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cryptoOrder.serviceType.value}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ maxWidth: '200px' }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {cryptoOrder.from.mainText}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cryptoOrder.from.secondaryText}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ maxWidth: '200px' }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {cryptoOrder.to.mainText}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cryptoOrder.to.secondaryText}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {cryptoOrder.distanceText}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {numeral(cryptoOrder.fare).format(
                        `${cryptoOrder.fare}0,0`
                      )}{' '}
                      VND
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(cryptoOrder.status)}
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
          count={filteredCryptoOrders.length}
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
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
