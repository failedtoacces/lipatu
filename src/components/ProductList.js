import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const products = [
  {
    id: 1,
    name: 'Nike Air Jordan 1',
    description: 'Nike Air Jordan 1',
    price: 45.00,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245/c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/24750e81-85ed-4b0e-8cd8-becf0cd97b2f/air-jordan-1-mid-shoes-7cdjgS.png',
    category: 'Nike',
    colors: ['Black', 'White', 'Blue'],
    sizes: ['40', '41', '42', '43'],
  },
  {
    id: 2,
    name: 'Adidas Samba',
    description: 'Samba',
    price: 25.00,
    image: 'https://www.adidas.co.id/media/catalog/product/B/7/B75807_SL_eCom.jpg',
    category: 'Adidas',
    colors: ['Black', 'White'],
    sizes: ['38', '39', '40', '41', '42'],
  },
  {
    id: 3,
    name: 'Acme Drawstring Bag',
    description: 'Convenient drawstring bag for daily use',
    price: 12.00,
    image: 'https://via.placeholder.com/200',
    category: 'Puma',
    colors: ['Black', 'Gray'],
    sizes: [], // No sizes for bags
  },
  // Tambahkan produk lainnya sesuai kebutuhan
];


const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
  backgroundColor: '#1a1a1a',
  color: '#fff',
}));

const ProductList = ({ onAddToCart, searchQuery, selectedCategory, onProductClick }) => {
  const [productList, setProductList] = useState(products);
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory === 'All') {
      setProductList(products);
    } else {
      setProductList(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    let sortedList = [...products];
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
    <Box display="flex" bgcolor="#121212" color="#fff" marginTop={8}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
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
