import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Dialog, DialogTitle, DialogContent, IconButton, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Carousel from './components/Carousel';
import theme from './theme';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State untuk Snackbar

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setSnackbarOpen(true); // Tampilkan Snackbar saat produk ditambahkan ke keranjang
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.reduce((ack, item) => {
        if (item.id === productId) {
          if (item.quantity === 1) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [])
    );
  };

  const handleDeleteFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleIncrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.reduce((ack, item) => {
        if (item.id === productId) {
          if (item.quantity === 1) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [])
    );
  };

  const getTotalItems = (items) => items.reduce((ack, item) => ack + item.quantity, 0);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedProduct(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar 
          setCartOpen={setCartOpen} 
          getTotalItems={() => getTotalItems(cartItems)} 
          setSearchQuery={setSearchQuery}
          setCategory={setSelectedCategory} 
        />
        <Container sx={{ mt: { xs: 2, md: 4 } }}>
          {!searchQuery && <Carousel />}
          <Routes>
            <Route path="/" element={<ProductList onAddToCart={handleAddToCart} searchQuery={searchQuery} selectedCategory={selectedCategory} onProductClick={handleProductClick} />} />
          </Routes>
        </Container>
      </Router>
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)}>
        <DialogTitle>
          My Cart
          <IconButton
            aria-label="close"
            onClick={() => setCartOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Cart
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}
            onDelete={handleDeleteFromCart}
            onIncrement={handleIncrementQuantity}
            onDecrement={handleDecrementQuantity}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={detailOpen} onClose={handleDetailClose} maxWidth="md" fullWidth>
        {selectedProduct && (
          <>
            <DialogTitle>
              {selectedProduct.name}
              <IconButton
                aria-label="close"
                onClick={handleDetailClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <ProductDetail product={selectedProduct} onAddToCart={handleAddToCart} />
            </DialogContent>
          </>
        )}
      </Dialog>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Product added to cart!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
