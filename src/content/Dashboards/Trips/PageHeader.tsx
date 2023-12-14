import { Typography, Avatar, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

function PageHeader() {
  const [user, setUser] = useState({});
  const theme = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8),
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatarUrl}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle2">HCMUBCab</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
