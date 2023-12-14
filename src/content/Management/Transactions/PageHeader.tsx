import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

function PageHeader() {
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Danh sách các chuyến đi
        </Typography>
        <Typography variant="subtitle2"></Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          href="transactions/create"
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Tạo chuyến đi mới
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
