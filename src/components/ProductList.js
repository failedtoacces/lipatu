import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
  backgroundColor: '#1a1a1a',
  color: '#fff',
}));

const ProductList = ({ onAddToCart, searchQuery, selectedCategory, onProductClick }) => {
  const [productList, setProductList] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    axios.get('http://lipatibe.vercel.app/products')
      .then(response => {
        setProductList(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      axios.get('http://lipatibe.vercel.app/products')
        .then(response => {
          setProductList(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the products!", error);
        });
    } else {
      axios.get('http://lipatibe.vercel.app/products')
        .then(response => {
          setProductList(response.data.filter(product => product.category === selectedCategory));
        })
        .catch(error => {
          console.error("There was an error fetching the products!", error);
        });
    }
  }, [selectedCategory]);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    let sortedList = [...productList];
    if (order === 'price-asc') {
      sortedList.sort((a, b) => a.price - b.price);
    } else if (order === 'price-desc') {
      sortedList.sort((a, b) => b.price - a.price);
    }
    setProductList(sortedList);
  };

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box display="flex" bgcolor="#121212" color="#fff" mt={{ xs: 2, md: 4 }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel>Sort by</InputLabel>
            <Select value={sortOrder} onChange={handleSortChange} label="Sort by">
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="trending">Trending</MenuItem>
              <MenuItem value="latest">Latest arrivals</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <StyledCard onClick={() => onProductClick(product)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    ${product.price.toFixed(2)} USD
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductList;
