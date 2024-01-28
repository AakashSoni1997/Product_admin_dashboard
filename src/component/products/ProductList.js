import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.5s",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  transition: "transform 1s",
  transformOrigin: "center",
  borderRadius: "8px",
  "&:hover": {
    transform: "scale(1.2)",
  },
});

const StyledTypography = styled(Typography)({
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 500,
});

const LoadingMessage = styled("p")(({ theme }) => ({
  fontSize: "2rem",
  textAlign: "center",
  marginTop: "50vh",
  color: theme.palette.primary.main,
}));

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
        setLoading(false);

        const intervalId = setInterval(() => {
          setCurrentImageIndex(
            (prevIndex) =>
              (prevIndex + 1) % response.data.products[0].images.length
          );
        }, 5000);

        return () => clearInterval(intervalId);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" color="primary" gutterBottom>
        Explore Our Products
      </Typography>
      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <StyledCard
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <StyledCardMedia
                component="img"
                alt={product.title}
                height="140"
                image={product.images[currentImageIndex]}
              />
              <CardContent>
                <StyledTypography variant="h6">
                  {product.title}
                </StyledTypography>
                <StyledTypography variant="body2" color="textSecondary">
                  {product.description}
                </StyledTypography>
                <StyledTypography variant="subtitle1" color="primary">
                  $
                  {(
                    (1 - product.discountPercentage / 100) *
                    product.price
                  ).toFixed(2)}
                </StyledTypography>
                <StyledTypography variant="subtitle2" color="textSecondary">
                  Rating: {product.rating} | Brand: {product.brand}
                </StyledTypography>
                <StyledTypography variant="body2" color="textSecondary">
                  Discount: {product.discountPercentage}% off
                </StyledTypography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default ProductList;
