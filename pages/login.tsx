import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Checkbox
} from '@mui/material';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BaseLayout from '@/layouts/BaseLayout';

function CreateTrip() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card sx={{ width: '100%' }}>
              {/* Add this line to make the Card full width */}
              <CardHeader title="HCMUS Cab Admin Portal Login" />
              <Divider />
              <CardContent sx={{ textAlign: 'center' }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="username"
                      label="Username"
                      type="search"
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      id="outlined-search"
                      label="Password"
                      type="password"
                    />
                  </div>
                  <div>
                    <Checkbox defaultChecked />
                    Remember me
                  </div>
                  <div>
                    <Button
                      sx={{ margin: 2 }}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Login
                    </Button>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

CreateTrip.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default CreateTrip;
