import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const user = {
    name: 'HCMUSCab Admin',
    avatar: '/static/images/avatars/5.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle2">HCMUS Project</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
