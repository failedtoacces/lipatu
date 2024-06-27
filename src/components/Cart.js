import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const CartItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
}));

const Cart = ({ cartItems, onRemove, onDelete, onIncrement, onDecrement }) => {
  const calculateTotal = (items) =>
    items.reduce((ack, item) => ack + item.quantity * item.price, 0);

  return (
    <div>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Keranjang Anda kosong</Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
              <CartItem sx={{ width: '100%' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price} x ${item.quantity}`}
                />
                <IconButton onClick={() => onDelete(item.id)}>
                  <CloseIcon />
                </IconButton>
                <Button onClick={() => onDecrement(item.id)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button onClick={() => onIncrement(item.id)}>+</Button>
              </CartItem>
            </ListItem>
          ))}
        </List>
      )}
      <Typography variant="h6">Total: ${calculateTotal(cartItems).toFixed(2)}</Typography>
      <Button variant="contained" color="primary" fullWidth disabled={cartItems.length === 0}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Cart;
