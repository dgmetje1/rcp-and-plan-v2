import { faker } from "@faker-js/faker";
import { Box, Chip, Grid, Paper, Typography } from "@mui/material";

const HomePageRecipePreviewCard = () => {
  return (
    <Paper sx={{ p: 5, bgcolor: "#f0efef" }}>
      <Grid columnSpacing={4} container spacing={2}>
        <Grid item xs={12}>
          <Typography color="#444" fontWeight="600" variant="h4">
            Recipe of the day
          </Typography>
        </Grid>
        <Grid
          item
          sx={{ img: { borderRadius: 2, boxShadow: "2px 1px 3px #aaa" } }}
          xs={4}
        >
          <img src={faker.image.urlLoremFlickr()} width="100%" />
        </Grid>
        <Grid display="flex" flexDirection="column" gap={2} item xs={8}>
          <Typography fontWeight={600} variant="h5">
            {faker.lorem.words(5)}
          </Typography>
          <Grid container spacing={2}>
            <Grid display="flex" flexDirection="column" gap={2} item xs>
              <Box display="flex" gap={1}>
                <Chip label="Deserts" />
                <Chip label="Vegan" />
              </Box>
              <Box display="flex" flexDirection="column" rowGap={2}>
                {Array(4)
                  .fill("")
                  .map(() => (
                    <Typography>
                      <strong>{faker.lorem.word()}:</strong>
                      {`${faker.number.int({ min: 1, max: 20 })} ${faker.lorem.word()}`}
                    </Typography>
                  ))}
              </Box>
            </Grid>
            <Grid item xs>
              <Typography fontWeight={600} variant="subtitle1">
                Ingredients
              </Typography>
              <Box component="ul" display="flex" flexDirection="column">
                {Array(6)
                  .fill("")
                  .map(() => (
                    <Box component="li">
                      <Typography>
                        {faker.number.int({ min: 1, max: 400 })} of{" "}
                        {faker.lorem.word()}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HomePageRecipePreviewCard;
