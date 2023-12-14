import { fetchStatistics } from "pages/api/BackendApi";
import { useState, useEffect } from "react";

const useAccountBalanceData = () => {
  const [totalRevenue, setTotalRevenue] = useState<any>(null);
  const [totalCustomers, setTotalCustomers] = useState<any>(null);
  const [totalDrivers, setTotalDrivers] = useState<any>(null);
  const [totalTrips, setTotalTrips] = useState<any>(null);
  const [changeOnThisMonth, setChangeOnThisMonth] = useState<any>(null);
  const [totalTripsByStatus, setTotalTripsByStatus] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStatistics(); // Implement this function to call your API
        setTotalRevenue(data["totalRevenue"]);
        setTotalDrivers(data["totalCustomers"]);
        setTotalCustomers(data["totalDrivers"]);
        setTotalTrips(data["totalTrips"]);
        setChangeOnThisMonth(data["changeLastMonth"]);
        setTotalTripsByStatus(data["totalTripsByStatus"]);
      } catch (error) {
        console.error("Error fetching account balance data:", error);
      }
    };

    fetchData();
  }, []);

  return [
    totalRevenue,
    totalCustomers,
    totalDrivers,
    totalTrips,
    changeOnThisMonth,
    totalTripsByStatus,
  ];
};

export default useAccountBalanceData;
