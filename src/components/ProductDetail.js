import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Container, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CloseButton = styled(Button)({
  position: 'absolute',
  top: 10,
  right: 10,
  minWidth: 'auto',
  width: 40,
  height: 40,
  borderRadius: '50%',
  padding: 0,
  backgroundColor: '#fff',
  color: '#000',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

const ProductDetail = ({ product, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : '');
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '');

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize
    });
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', mt: { xs: 2, md: 4 } }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#1d1d1d', color: '#fff', p: 2, position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', md: '50%' } }}
          image={product.image}
          alt={product.name}
        />
        <CardContent sx={{ width: '100%' }}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
            {product.description}
          </Typography>
          {product.colors && product.colors.length > 0 && (
            <>
              <Typography variant="body1" component="div" gutterBottom>
                COLOR
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={selectedColor}
                exclusive
                onChange={(event, newColor) => setSelectedColor(newColor)}
                aria-label="Color"
                sx={{ mb: 2 }}
              >
                {product.colors.map(color => (
                  <ToggleButton key={color} value={color} aria-label={color}>
                    {color}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </>
          )}
          {product.sizes && product.sizes.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" component="div" gutterBottom>
                SIZE
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={selectedSize}
                exclusive
                onChange={(event, newSize) => setSelectedSize(newSize)}
                aria-label="Size"
                sx={{ mb: 2 }}
              >
                {product.sizes.map(size => (
                  <ToggleButton key={size} value={size} aria-label={size}>
                    {size}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          )}
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
