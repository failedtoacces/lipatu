import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme, visible }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: visible ? '100%' : '0',
  transition: 'width 0.3s',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: visible ? 'auto' : '0',
  },
  overflow: 'hidden',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavBar = ({ setCartOpen, getTotalItems, setSearchQuery, setCategory }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleSearch = () => {
    setSearchVisible((prevVisible) => !prevVisible);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    setDrawerOpen(false); // Close the drawer when a category is selected
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#1a1a1a' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          LIPATU
        </Typography>
        <Search visible={searchVisible ? 1 : 0}>
          <StyledInputBase
            placeholder="Search for products..."
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
        <IconButton onClick={toggleSearch} color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="show cart items" color="inherit" onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems()} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {['All', 'Nike', 'Adidas', 'Puma'].map((text) => (
            <ListItem button key={text} onClick={() => handleCategoryClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
