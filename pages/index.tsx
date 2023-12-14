import { useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHeader from "@/content/Dashboards/Trips/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import Footer from "@/components/Footer";
import AccountBalance from "@/content/Dashboards/Trips/AccountBalance";

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const getUserToken = (): string | null => {
      if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("userToken");
        return token || null;
      }
      return null;
    };

    const userToken = getUserToken();

    if (!userToken) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>HCMUBCab Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Dashboard.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dashboard;
